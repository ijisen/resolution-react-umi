import React, { FC, useEffect, useRef } from 'react';
import { FormattedMessage, history, useIntl, useModel } from 'umi';
import { Button, Layout, message as $Message, PageHeader, Result } from 'antd';
import classNames from 'classnames';

import { setSessionStorage } from '@/utils/sessionStorage';
import { setLanguage } from '@/utils/commont_rely';

import SearchHeader from '@/pages/DNS/Settings/_components/SearchHeader';
import ComponentTable from '@/pages/DNS/Settings/_components/ComponentTable';

import { EnumDictKey } from '@/types/basic.d';
import { ColumnsItem, SearchDataParams } from '@/types/dns.d';

import styles from './index.less';
import PageSwitch from '@/pages/DNS/Settings/_components/PageSwitchComponent';
import { initSearchData } from '@/models/dnsSettingsModel';
import { isExistValue } from '@/utils';
import AddRecordComponent from './_components/AddRecordComponent';

const { Content } = Layout;

const getPageTitle = (domain: any) => {
  const intl = useIntl();
  return `${intl.formatMessage({
    id: 'menu.dns.setting',
    defaultMessage: '域名解析',
  })} ${domain}`;
};

/** 删除解析记录 */
const httpDeleteData = () => {};

const btnOptGroup = [
  {
    type: EnumDictKey.CREATE,
    id: 'dns.btn.create',
    desc: '添加记录',
  },
  {
    type: EnumDictKey.IMPORT,
    id: 'keywords.import',
    desc: '导入',
  },
  {
    type: EnumDictKey.DOWN,
    id: 'keywords.import.temp',
    desc: '下载模板',
  },
  {
    type: EnumDictKey.EXPORT,
    id: 'keywords.export',
    desc: '导出',
  },
  {
    type: EnumDictKey.STOP,
    id: 'dns.btn.stop.batch',
    desc: '批量暂停',
  },
  {
    type: EnumDictKey.START,
    id: 'dns.btn.start.batch',
    desc: '启动批量',
  },
  {
    type: EnumDictKey.DELETE,
    id: 'dns.btn.delete.batch',
    desc: '批量删除',
  },
];

const PageContent: FC = (props) => {
  const actionRef = useRef();
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

  /** 操作栏按钮点击事件 */
  const handleOptBtnClick = (role: EnumDictKey, data?: ColumnsItem[]) => {
    console.log(`handleOptBtnClick ${role}`);
    switch (role) {
      case EnumDictKey.CREATE:
        // 新增记录
        break;
      case EnumDictKey.IMPORT:
        // 导入
        break;
      case EnumDictKey.DOWN:
        // 下载导入模板
        break;
      case EnumDictKey.EXPORT:
        // 导出
        break;
      case EnumDictKey.START:
        // 批量启动
        break;
      case EnumDictKey.STOP:
        // 批量暂停
        break;
      case EnumDictKey.DELETE:
        // 批量删除
        break;
      default:
        console.log(`undefined Role ${role}`);
    }
  };

  /** 表格按钮点击事件*/
  const handleTableClick = (role: EnumDictKey, record: ColumnsItem) => {
    switch (role) {
      case EnumDictKey.EDIT:
        break;
      case EnumDictKey.DELETE:
        break;
      case EnumDictKey.START:
        break;
      case EnumDictKey.STOP:
        break;
      default:
        console.log(`undefined Role ${role}`);
    }
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
          $Message.error(
            message || <FormattedMessage id="message.http.get.error" />,
          );
        }
      })
      .catch((err) => {
        console.log(`网络异常，请稍候重试。${err}`);
        $Message.error(<FormattedMessage id="message.http.error.network" />);
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
                  <FormattedMessage id="keywords.return" />
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

            {/**  操作栏按钮  */}
            <div className={styles.optBtn}>
              {btnOptGroup.map((item) => (
                <Button
                  className="mrs"
                  key={item.type}
                  onClick={() => handleOptBtnClick(item.type)}
                >
                  <FormattedMessage id={item.id} />
                </Button>
              ))}
              <AddRecordComponent
                // actionRef={actionRef}

                recordTypeData={recordTypeData}
                hostLineData={hostLineData}
                onSubmit={(data) => {
                  console.log(data);
                }}
              />
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
              onBtnClick={handleTableClick}
            />
          </>
        )}
      </Content>
    </Layout>
  );
};

export default PageContent;
