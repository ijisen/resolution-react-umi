import React, { FC, memo, useState } from 'react';
import { FormattedMessage } from 'umi';
import { Form, Input, Button, Select, Drawer, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { filterInputTextSpace } from '@/utils';
import { setLanguage } from '@/utils/commont_rely';

import styles from './style.less';

const { Option } = Select;

interface PageInit {
  recordTypeData: any[];
  hostLineData: any[];
  onSubmit: (data: {}) => void;
}

const addRecordComponent: FC<PageInit> = memo(
  ({ recordTypeData, hostLineData, onSubmit }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(true);
    const [submitting, setFormStatus] = useState(true);
    const [formData, setFormData] = useState({
      type: 'A',
      view: 'others',
    });

    const onFinish = (values: any) => {
      console.log('Finish:', values);
      onSubmit({
        ...values,
      });
    };
    const onClose = (e: any) => {
      console.log(e);
      setVisible(false);
    };

    const handleReset = () => {
      console.log('handleReset');
    };

    const formItemLayout = {
      labelCol: { span: 2 },
    };
    console.log('--- addRecordComponent -----');

    return (
      <Drawer
        title={<FormattedMessage id="dns.btn.create" />}
        width={780}
        closable={false}
        onClose={onClose}
        visible={visible}
        className={styles.addRecordComponent}
        extra={
          <Space>
            <span className={styles.closeBtn} onClick={onClose}>
              <CloseOutlined />
            </span>
          </Space>
        }
        footer={
          <div className="text-rt">
            <Button className="mrl">
              <FormattedMessage id="keywords.cancel" />
            </Button>
            <Button type="primary">
              <FormattedMessage id="keywords.confirm" />
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          name="search_form"
          layout="vertical"
          initialValues={formData}
          autoComplete="off"
          onFinish={onFinish}
        >
          {/** 记录类型 */}
          <Form.Item
            label={setLanguage('dns.keywords.type')}
            name="type"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="dns.keywords.type" />,
              },
            ]}
          >
            <Select placeholder={setLanguage('dns.keywords.type')}>
              {recordTypeData.map((item) => (
                <Option key={item.dataKey} value={item.dataKey}>
                  {item.dataValue}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/** 主机 */}
          {/**
           A host record (RR) value cannot start or end with "." or "-". A host record (RR) value cannot contain consecutive ".". The strings separated by "." cannot contain more than 63 characters each.
           主机记录（RR）值不能以\“."、\“-"开头或结尾 主机记录（RR）值不能有连续的"."。 .分割的每个字符串长度不能超过63字符
           */}
          <Form.Item
            label={setLanguage('dns.keywords.host')}
            name="name"
            normalize={(value, prevValue, prevValues) =>
              filterInputTextSpace(value)
            }
          >
            <Input
              placeholder={setLanguage('dns.keywords.host')}
              allowClear={true}
            />
          </Form.Item>

          {/** 智能线路的 */}
          <Form.Item label={setLanguage('dns.keywords.line')} name="view">
            {/** 域名未添加默认解析线路配置，会造成部分地区访问失败，解析线路请选择默认。
             记录值 */}
            {/** There is no default line configuration for the domain name, which will cause access failure in some areas. Select the default for the line configuration.
             */}
            <Select placeholder={setLanguage('dns.keywords.line')}>
              {hostLineData.map((item) => (
                <Option key={item.view} value={item.view}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/** 解析记录值 */}
          <Form.Item
            label={setLanguage('dns.keywords.value')}
            name="rdata"
            normalize={(value, prevValue, prevValues) =>
              filterInputTextSpace(value)
            }
          >
            <Input placeholder={setLanguage('dns.keywords.value')} />
          </Form.Item>

          {/** MX
           MX记录的记录值为域名形式（如abc.example.com）
           The MX record value is in the domain name format (for example, abc.example.com).
           */}
        </Form>
      </Drawer>
    );
  },
);

export default addRecordComponent;
