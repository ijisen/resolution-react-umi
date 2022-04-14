import React, { FC, memo, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { Form, Input, Popover, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { filterInputTextSpace } from '@/utils';
import { isLocaleEn } from '@/utils/commont_rely';
import isFQDN from '@/utils/http/isFQDN';
import isRdata from '@/utils/rr/validator';

import { EnumRecordStatusData } from '@/types/dns.d';
import { EnumDictKey } from '@/types/basic.d';
import { EnumRecordType } from '@/utils/rr/typings.d';
import { RuleObject, Store, StoreValue } from 'rc-field-form/lib/interface.d';

import styles from './style.less';

import ViewPopover from '../ViewPopover';
import HostPopover from '../HostPopover';
import RdataPopover from '../RdataPopover';
import TTLPopover from '../TTLPopover';

import isNumber from '@/utils/isNumber';
import isTTL from '@/utils/http/isTTL';
import isInRange from '@/utils/isInRange';

const { Option } = Select;

interface PageInit {
  recordTypeData: any[];
  hostLineData: any[];
}

const normalizeMXPriority = (
  value: StoreValue,
  prevValue: StoreValue,
  allValues: Store,
) => {
  console.log(value, prevValue, allValues);
  value = filterInputTextSpace(value);
  if (isNumber(value)) {
    return parseInt(value);
  }
  return prevValue || 5;
};

const TTLConfig = {
  min: 60,
  max: 65535,
  defaults: 3600,
};

const normalizeTTL = (
  value: StoreValue,
  prevValue: StoreValue,
  allValues: Store,
) => {
  console.log(value, prevValue, allValues);
  value = filterInputTextSpace(value);
  if (isNumber(value)) {
    return parseInt(value);
  }
  return prevValue || 3600;
};

const index: FC<PageInit> = memo(({ recordTypeData, hostLineData }) => {
  const { formatMessage, locale } = useIntl();
  const [form] = Form.useForm();
  const [role, setRole] = useState(EnumDictKey.CREATE);
  const [submitting, setFormStatus] = useState(true);
  const [formData, setFormData] = useState({
    id: undefined,
    // 为要添加解析记录的zone的id,如baidu.com.
    zone: 'baidu.com',
    // 解析记录全名，含zone的name,如www.baidu.com.
    name: '@',
    // 解析记录类型: A, AW, AAAA...
    type: 'A',
    // 记录值，详见
    rdata: '',
    // 智能线路的id，others为默认线路
    view: 'others',
    // 1 - 50
    mxPriority: 5,
    // 一般为3600，60~65535
    ttl: 3600,
    // 解析记录状态
    flags: EnumRecordStatusData.START,
    // 备注，可用于全局查找
    note: '',
  });

  const onFinish = (values: any) => {
    console.log('Finish:', values);
    /* onSubmit({
         ...values,
       });*/
  };

  /**
   * 【主机记录】校验
   * */
  const validatorHost = (rule: RuleObject, value: StoreValue) => {
    console.log(rule);
    if (value === '@' || value === '*') {
      return Promise.resolve();
    }
    const res = isFQDN(`${value}.${formData.zone}`, locale, {
      allow_trailing_dot: true,
      // 是否允许配符 *
      // *.dd.baidu.com
      allow_wildcard: true,
    });
    console.log(res);
    if (res && res.success) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(res.message));
  };

  /**
   * 【记录值】 校验
   * */
  const validatorRData = (rule: RuleObject, value: StoreValue) => {
    const type = form.getFieldValue('type');
    console.log(formData);
    console.log(type);
    if (!type) {
      const err_msg = formatMessage({ id: 'dns.form.type.required' });
      form.setFields([
        {
          name: 'type',
          errors: [err_msg],
        },
      ]);
      return Promise.reject(new Error(err_msg));
    } else {
      if (value) {
        const { success, message } = isRdata(value, type, locale);
        if (!success) {
          return Promise.reject(message);
        }
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(formatMessage({ id: 'dns.form.value.required' })),
      );
    }
  };

  /**
   * 【MX 优先级】校验
   * */
  const validatorMXPriority = (rule: RuleObject, value: StoreValue) => {
    const range = {
      min: 1,
      max: 50,
    };
    if (isInRange(value, range.min, range.max)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(formatMessage({ id: 'dns.form.mxPriority.required' }, range)),
    );
  };

  /**
   * 【TLL】校验
   * */
  const validatorTTL = (rule: any, value: any) => {
    if (isTTL(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(formatMessage({ id: 'dns.form.ttl.required' }, TTLConfig)),
    );
  };

  const inputWidth = { width: 'calc(100% - 30px)' };
  console.log('--- CreateForm Component -----');

  return (
    <Form
      form={form}
      name="create_form"
      layout="vertical"
      initialValues={formData}
      autoComplete="off"
      onFinish={onFinish}
      className={styles.createForm}
      style={{ paddingRight: 50 }}
    >
      {/** 记录类型 */}
      <Form.Item
        label={formatMessage({ id: 'dns.keywords.type' })}
        name="type"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="dns.form.type.required" />,
          },
        ]}
      >
        <Select placeholder={formatMessage({ id: 'dns.keywords.type' })}>
          {recordTypeData.map((item) => (
            <Option key={item.dataKey} value={item.dataKey}>
              {item.dataValue} - {isLocaleEn() ? item.descEn : item.desc}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/** 主机记录 */}
      <Form.Item
        className={styles.space}
        required={true}
        label={formatMessage({ id: 'dns.keywords.host' })}
      >
        <Form.Item
          name="name"
          noStyle
          style={inputWidth}
          normalize={(value) => filterInputTextSpace(value)}
          rules={[
            {
              required: true,
              validator: validatorHost,
            },
          ]}
        >
          <Input
            placeholder={formatMessage({ id: 'dns.keywords.host' })}
            suffix={`.${formData.zone}`}
          />
        </Form.Item>

        <Popover
          overlayClassName={styles.popoverContent}
          content={<HostPopover />}
        >
          <span className={styles.tooltipBtn}>
            <QuestionCircleOutlined />
          </span>
        </Popover>
      </Form.Item>

      {/** 解析线路 */}
      <Form.Item
        className={styles.space}
        required={true}
        label={formatMessage({ id: 'dns.keywords.line' })}
      >
        <Form.Item
          name="view"
          noStyle
          style={inputWidth}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="dns.form.line.required" />,
            },
          ]}
        >
          <Select placeholder={formatMessage({ id: 'dns.keywords.line' })}>
            {hostLineData.map((item) => (
              <Option key={item.view} value={item.view}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Popover
          overlayClassName={styles.popoverContent}
          content={<ViewPopover />}
        >
          <span className={styles.tooltipBtn}>
            <QuestionCircleOutlined />
          </span>
        </Popover>
      </Form.Item>

      {/** 解析记录值 */}
      <Form.Item
        className={styles.space}
        required={true}
        label={formatMessage({ id: 'dns.keywords.value' })}
      >
        <Form.Item
          name="rdata"
          noStyle
          style={inputWidth}
          dependencies={['type']}
          normalize={(value, prevValue, prevValues) => value.trim()}
          rules={[
            {
              required: true,
              validator: validatorRData,
            },
          ]}
        >
          <Input placeholder={formatMessage({ id: 'dns.keywords.value' })} />
        </Form.Item>
        <Popover
          overlayClassName={styles.popoverContent}
          content={<RdataPopover />}
        >
          <span className={styles.tooltipBtn}>
            <QuestionCircleOutlined />
          </span>
        </Popover>
      </Form.Item>

      {/** MX 优先级 */}
      {form.getFieldValue('type') === EnumRecordType.MX && (
        <Form.Item
          className={styles.space}
          required={true}
          normalize={normalizeMXPriority}
          label={formatMessage({ id: 'dns.keywords.mxPriority' })}
          name="mxPriority"
          rules={[
            {
              required: true,
              validator: validatorMXPriority,
            },
          ]}
        >
          <Input
            min={1}
            max={50}
            placeholder={formatMessage({ id: 'dns.keywords.mxPriority' })}
          />
        </Form.Item>
      )}

      {/** TTL */}
      <Form.Item className={styles.space} required={true} label="TTL">
        <Form.Item
          name="ttl"
          noStyle
          normalize={normalizeTTL}
          rules={[
            {
              required: true,
              validator: validatorTTL,
            },
          ]}
        >
          <Input suffix="s" placeholder="TTL" />
        </Form.Item>
        <Popover
          overlayClassName={styles.popoverContent}
          content={<TTLPopover {...TTLConfig} />}
        >
          <span className={styles.tooltipBtn}>
            <QuestionCircleOutlined />
          </span>
        </Popover>
      </Form.Item>
    </Form>
  );
});

export default index;
