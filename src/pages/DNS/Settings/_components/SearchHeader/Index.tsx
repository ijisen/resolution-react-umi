import React, { FC, useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useIntl } from 'umi';
import { filterInputTextSpace } from '@/utils';
import { SearchData } from '@/services/dns';

const { Option } = Select;

const formData = {
  host: '主机记录',
  type: '类型',
  line: '线路',
  value: '记录值',
  ttl: 'TTL',
  status: '状态',
  actions: '操作',
};

function handleChange(value: string) {
  console.log(`selected ${value}`);
}

const setLanguage = (keys: string) => {
  const intl = useIntl();
  return intl.formatMessage({
    id: keys,
    defaultMessage: '-',
  });
};

interface pageProps {
  onSearch: (data: SearchData) => void;
}

const SearchHeader: FC<pageProps> = ({ onSearch }) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: any) => {
    console.log('Finish:', values);
    onSearch(values);
  };

  return (
    <Form form={form} name="search_form" layout="inline" onFinish={onFinish}>
      <Form.Item
        label={setLanguage('dns.keywords.host')}
        name="host"
        normalize={(value, prevValue, prevValues) =>
          filterInputTextSpace(value)
        }
      >
        <Input placeholder="host" allowClear={true} />
      </Form.Item>
      <Form.Item label={setLanguage('dns.keywords.type')} name="type">
        <Select style={{ width: 120 }} onChange={handleChange}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label={setLanguage('dns.keywords.value')}
        name="value"
        normalize={(value, prevValue, prevValues) =>
          filterInputTextSpace(value)
        }
      >
        <Input placeholder="value" />
      </Form.Item>
      <Form.Item label={setLanguage('dns.keywords.line')} name="line">
        <Select style={{ width: 120 }} onChange={handleChange}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
        </Select>
      </Form.Item>
      <Form.Item className="mrn">
        <Button type="primary" htmlType="submit">
          {setLanguage('keywords.search')}
        </Button>
        <Button className="mls">{setLanguage('keywords.reset')}</Button>
      </Form.Item>
    </Form>
  );
};

export default SearchHeader;
