import React, { FC, useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { filterInputTextSpace } from '@/utils';
import { SearchData } from '@/services/dns';
import { setLanguage } from '@/utils/commont_rely';
import { searchData } from '@/models/dnsSettingsModel';

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

interface pageProps {
  loading: boolean;
  recordTypeData: any[];
  hostLineData: any[];
  onSearch: (data: SearchData) => void;
}

const SearchHeader: FC<pageProps> = ({
  loading,
  recordTypeData,
  hostLineData,
  onSearch,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Finish:', values);
    onSearch(values);
  };
  return (
    <Form
      form={form}
      name="search_form"
      layout="inline"
      initialValues={searchData}
      autoComplete="off"
      onFinish={onFinish}
    >
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
          <Option value="">{setLanguage('keyword.all')}</Option>
          {recordTypeData.map((item) => (
            <Option key={item.dataKey} value={item.dataKey}>
              {item.dataValue}
            </Option>
          ))}
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
          <Option value="">{setLanguage('keyword.all')}</Option>
          {hostLineData.map((item) => (
            <Option key={item.dataKey} value={item.dataKey}>
              {item.dataValue}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item className="mrn">
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          {setLanguage(loading ? 'keyword.search.loading' : 'keyword.search')}
        </Button>
        <Button className="mls" disabled={loading}>
          {setLanguage('keyword.reset')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchHeader;
