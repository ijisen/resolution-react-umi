import React, { FC, memo } from 'react';
import { Form, Input, Button, Select, Row } from 'antd';

import { filterInputTextSpace } from '@/utils';
import { setLanguage } from '@/utils/commont_rely';

import { SearchDataParams } from '@/types/dns.d';
import { EnumDictKey } from '@/types/basic.d';

const { Option } = Select;

interface PageInit {
  loading: boolean;
  initSearchData: SearchDataParams;
  recordTypeData: any[];
  hostLineData: any[];
  onSearch: (role: EnumDictKey, params?: SearchDataParams) => void;
}

const SearchHeader: FC<PageInit> = memo(
  ({ loading, initSearchData, recordTypeData, hostLineData, onSearch }) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
      console.log('Finish:', values);
      onSearch(EnumDictKey.SEARCH, {
        ...values,
      });
    };

    const handleClearSearch = async () => {
      form.resetFields();
      onSearch(EnumDictKey.CLEAR);
    };

    const formItemLayout = {
      labelCol: { span: 8 },
    };
    console.log(initSearchData);
    console.log('--- searchData -----');

    return (
      <Form
        form={form}
        name="search_form"
        {...formItemLayout}
        // layout="inline"
        initialValues={initSearchData}
        className="page-search-form"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Row>
          {/** 主机 */}
          <div style={{ width: 240, marginRight: 10 }}>
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
          </div>

          {/** 记录类型 */}
          <div style={{ width: 220, marginRight: 10 }}>
            <Form.Item
              labelCol={{ span: 6 }}
              label={setLanguage('dns.keywords.type')}
              name="type"
            >
              <Select>
                <Option value="">{setLanguage('keyword.all')}</Option>
                {recordTypeData.map((item) => (
                  <Option key={item.dataKey} value={item.dataKey}>
                    {item.dataValue}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Row>
        <Row>
          {/** 解析记录值 */}
          <div style={{ width: 240, marginRight: 10 }}>
            <Form.Item
              label={setLanguage('dns.keywords.value')}
              name="rdata"
              normalize={(value, prevValue, prevValues) =>
                filterInputTextSpace(value)
              }
            >
              <Input placeholder={setLanguage('dns.keywords.value')} />
            </Form.Item>
          </div>
          {/** 智能线路的 */}
          <div style={{ width: 220, marginRight: 10 }}>
            <Form.Item
              labelCol={{ span: 6 }}
              label={setLanguage('dns.keywords.line')}
              name="view"
            >
              <Select>
                <Option value="">{setLanguage('keyword.all')}</Option>
                {hostLineData.map((item) => (
                  <Option key={item.view} value={item.ID}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div style={{ width: 240 }}>
            <Form.Item className="mrn">
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading}
                loading={loading}
              >
                {setLanguage(
                  loading ? 'keyword.search.loading' : 'keyword.search',
                )}
              </Button>
              <Button
                className="mls"
                disabled={loading}
                onClick={handleClearSearch}
              >
                {setLanguage('keyword.reset')}
              </Button>
            </Form.Item>
          </div>
        </Row>
      </Form>
    );
  },
);

export default SearchHeader;
