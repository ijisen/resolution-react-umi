import React, {
  FC,
  ForwardedRef,
  forwardRef,
  memo,
  Ref,
  useImperativeHandle,
  useState,
} from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { Button, Drawer, Form, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { EnumDictKey } from '@/types/basic.d';

import styles from './style.less';

import CreateForm from './_component/CreateForm';

interface PageInit {
  recordTypeData: any[];
  hostLineData: any[];
  onSubmit: (data: {}) => void;
}

/**
 * 设置弹框标题
 *
 * */
const getDrawerTitle = (role: EnumDictKey) => {
  if (role === EnumDictKey.EDIT) {
    return <FormattedMessage id="dns.btn.edit.title" />;
  }
  return <FormattedMessage id="dns.btn.create" />;
};

const addRecordComponent: FC<PageInit> = memo(
  forwardRef(({ recordTypeData, hostLineData, onSubmit }, ref) => {
    const [visible, setVisible] = useState(false);
    const [role, setRole] = useState(EnumDictKey.CREATE);
    useImperativeHandle(ref, () => ({
      // changeVal 就是暴露给父组件的方法
      changeVal: (newVal: string) => {},
    }));

    const handleShowModel = (role: EnumDictKey, data: {}) => {
      setRole(role);
      setVisible(true);
      if (role === EnumDictKey.EDIT) {
        console.log(data);
        /*setFormData({
          ...data
        })*/
      }
    };

    const handleCloseModel = (e: any) => {
      console.log(e);
      setVisible(false);
    };

    const handleSubmit = (values: any) => {
      console.log('Finish:', values);
      /* onSubmit({
         ...values,
       });*/
    };

    const handleReset = () => {
      console.log('handleReset');
    };

    console.log('--- addRecordComponent -----');

    return (
      <Drawer
        title={getDrawerTitle(role)}
        width={780}
        closable={false}
        onClose={handleCloseModel}
        visible={visible}
        className={styles.addRecordComponent}
        extra={
          <Space>
            <span className={styles.closeBtn} onClick={handleCloseModel}>
              <CloseOutlined />
            </span>
          </Space>
        }
        footer={
          <div className="text-rt">
            <Button className="mrl" onClick={handleCloseModel}>
              <FormattedMessage id="keywords.cancel" />
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              <FormattedMessage id="keywords.confirm" />
            </Button>
          </div>
        }
      >
        <CreateForm
          recordTypeData={recordTypeData}
          hostLineData={hostLineData}
        />
      </Drawer>
    );
  }),
);

export default addRecordComponent;
