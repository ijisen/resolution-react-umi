import React, { FC, useEffect } from 'react';
import { history, useIntl } from 'umi';
import { Button, Form, Layout, PageHeader } from 'antd';
import { setSessionStorage } from '@/utils/sessionStorage';
import SearchHeader from '@/pages/DNS/Settings/_components/SearchHeader';
import { useModel } from '@@/plugin-model/useModel';

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
  const { state, fetchDNSListData } = useModel('dnsSettingsModel', (model) => ({
    state: model.state,
    fetchDNSListData: model.fetchDNSListData,
  }));

  const intl = useIntl();
  useEffect(() => {
    console.log(state);
    if (redirect) {
      // 将返回DPP 地址存入session， 避免刷新时读取不到
      setSessionStorage('redirect', redirect);
    }
  }, []);

  if (!domain) {
    return <h1>Error</h1>;
  }
  return (
    <Layout className="zdns-page-layout" style={{ minWidth: 1080 }}>
      <Content>
        <PageHeader
          onBack={() => null}
          backIcon={null}
          title={getPageTitle(domain)}
        />
        <SearchHeader
          onSearch={(searchData) => {
            console.log(state);
            fetchDNSListData(searchData);
          }}
        />
        <h1> DNS SETTINGS </h1>
        <h2>2222222</h2>
        <Button type="primary" htmlType="submit">
          {intl.formatMessage({
            id: 'keywords.search',
          })}
        </Button>
        <Button className="mls">
          {intl.formatMessage({
            id: 'keywords.reset',
          })}
        </Button>
      </Content>
    </Layout>
  );
};

export default PageContent;
