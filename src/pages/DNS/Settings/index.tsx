import React, { FC, useEffect } from 'react';
import { history, useIntl, useModel } from 'umi';
import { Button, Layout, message as $Message, PageHeader, Result } from 'antd';
import classNames from 'classnames';

import { setSessionStorage } from '@/utils/sessionStorage';
import { setLanguage } from '@/utils/commont_rely';

import SearchHeader from '@/pages/DNS/Settings/_components/SearchHeader';
import ComponentTable from '@/pages/DNS/Settings/_components/ComponentTable';

import { EnumDictKey } from '@/types/basic.d';
import { SearchDataParams } from '@/types/dns.d';

import styles from './index.less';
import PageSwitch from '@/pages/DNS/Settings/_components/PageSwitchComponent';
import { initSearchData } from '@/models/dnsSettingsModel';
import { isExistValue } from '@/utils';

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

  /** 查询按钮回调事件 */
  const handleSearchData = (role: EnumDictKey, params?: SearchDataParams) => {
    if (loading) {
      return false;
    }
    params = {
      ...params,
      pageNumber: 1,
      pageSize: searchData.pageSize,
    };
    if (role === EnumDictKey.CLEAR) {
      params = {
        ...initSearchData,
        pageSize: searchData.pageSize,
      };
    }
    getTableData({
      ...params,
      zone: `${domain}.`,
    });
  };
  /**
   * 获取表格数据
   * */
  const getTableData = (params: SearchDataParams) => {
    // 配置查询条件，过滤掉空值， 接口不支持空值
    const buildParams = (params: SearchDataParams) => {
      const _params: { [propName: string]: any } = {};
      for (let [key, value] of Object.entries(params)) {
        if (isExistValue(value)) {
          _params[key] = value;
        }
      }
      return _params;
    };
    fetchDNSListData({
      ...buildParams(params),
    })
      .then((res) => {
        const { success, message } = res;
        if (!success) {
          console.log('加载失败');
          $Message.error(message || setLanguage('message.http.get.error'));
        }
      })
      .catch((err) => {
        console.log(`网络异常，请稍候重试。${err}`);
        $Message.error(setLanguage('message.http.error.network'));
      });
  };

  useEffect(() => {
    console.log(state);
    if (domain) {
      handleSearchData(EnumDictKey.CLEAR);
      getPageInitData();
    }
    if (redirect) {
      // 将返回DPP 地址存入session， 避免刷新时读取不到
      setSessionStorage(EnumDictKey.REDIRECT, redirect);
    }
  }, []);

  const { tableData, recordStatusData, recordTypeData, searchData } = state;

  return (
    <Layout
      className={classNames('zdns-page-layout', styles.pageZdns)}
      style={{ minWidth: 1120 }}
    >
      <Content>
        {!domain ? (
          <Result
            status="error"
            title={setLanguage('message.opt.error.params')}
            extra={
              redirect && (
                <Button type="primary" key="console">
                  {setLanguage('keyword.return')}
                </Button>
              )
            }
          />
        ) : (
          <>
            <PageHeader
              onBack={() => null}
              backIcon={null}
              title={getPageTitle(domain)}
            />

            {/** 查询组件 */}
            <SearchHeader
              loading={loading}
              initSearchData={initSearchData}
              recordTypeData={recordTypeData}
              hostLineData={hostLineData}
              onSearch={handleSearchData}
            />

            {/**  操作按钮  */}
            <div className={styles.optBtn}>
              <Button>{setLanguage('keyword.search')}</Button>
              <Button className="mls">{setLanguage('keyword.reset')}</Button>
            </div>

            {/** 分页切换组件*/}
            <PageSwitch
              loading={loading}
              pageSize={searchData.pageSize}
              onChange={(pageSize: number) => {
                getTableData({
                  ...searchData,
                  pageSize,
                  pageNumber: 1,
                });
              }}
            />

            {/**  表格按钮  */}
            <ComponentTable
              loading={loading}
              tableData={tableData}
              recordStatusData={recordStatusData}
              onChange={(pageNumber: number) => {
                getTableData({
                  ...searchData,
                  pageNumber,
                });
              }}
            />
          </>
        )}
      </Content>
    </Layout>
  );
};

export default PageContent;
