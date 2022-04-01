import React, { FC, useEffect } from 'react';
import { history, useIntl } from 'umi';
import {
  Button,
  Form,
  Layout,
  PageHeader,
  Result,
  message as $Message,
  Table,
} from 'antd';
import { setSessionStorage } from '@/utils/sessionStorage';
import SearchHeader from '@/pages/DNS/Settings/_components/SearchHeader';
import { useModel } from '@@/plugin-model/useModel';
import { setLanguage } from '@/utils/commont_rely';
import { SearchDataParams } from '@/services/dns';
import ComponentTable from '@/pages/DNS/Settings/_components/ComponentTable';

const { Content } = Layout;

const getPageTitle = (domain: any) => {
  const intl = useIntl();
  return `${intl.formatMessage({
    id: 'menu.dns.setting',
    defaultMessage: '域名解析',
  })} ${domain}`;
};

const PageContent: FC = (props) => {
  const { domain = '', redirect } = history.location.query || {};
  const { loading, state, hostLineData, fetchDNSListData, getPageInitData } =
    useModel('dnsSettingsModel', (model) => ({
      loading: model.loading,
      state: model.state,
      hostLineData: model.hostLineData,
      fetchDNSListData: model.fetchDNSListData,
      getPageInitData: model.getPageInitData,
    }));

  const handleGetListData = async (params: SearchDataParams) => {
    const response = await fetchDNSListData(params);
    const { success, message } = response;
    if (success) {
      console.log('加载成功');
      // message.success('This is an error message');
    } else {
      console.log('加载失败');
      // $Message.error(message || setLanguage('message.http.get.error'));
    }
  };

  const { tableData, recordTypeData } = state;
  useEffect(() => {
    console.log(state);
    if (domain) {
      getPageInitData();
      // handleGetListData({});
    }
    if (redirect) {
      // 将返回DPP 地址存入session， 避免刷新时读取不到
      setSessionStorage('redirect', redirect);
    }
  }, []);

  return (
    <Layout className="zdns-page-layout" style={{ minWidth: 1120 }}>
      <Content>
        {!domain ? (
          <Result
            status="error"
            title={setLanguage('message.opt.error.params')}
            extra={
              <Button type="primary" key="console">
                Go Console
              </Button>
            }
          />
        ) : (
          <>
            <PageHeader
              onBack={() => null}
              backIcon={null}
              title={getPageTitle(domain)}
            />
            <SearchHeader
              loading={loading}
              recordTypeData={recordTypeData}
              hostLineData={hostLineData}
              onSearch={(searchData) => {
                console.log(state);
                console.log(loading);
                !loading && fetchDNSListData(searchData);
              }}
            />
            <ComponentTable />

            <h1> DNS SETTINGS </h1>
            <h2>2222222</h2>
            <Button type="primary" htmlType="submit">
              {setLanguage('keyword.search')}
            </Button>
            <Button className="mls">{setLanguage('keyword.reset')}</Button>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default PageContent;
