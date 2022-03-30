import React from 'react';
import { history, RequestConfig, useIntl } from 'umi';

import { httpGetUserInfo } from '@/services';

import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

const loginPath = '/user/login';
import Header from '@/component/Header';
import { getLocale, setLocale } from '@@/plugin-locale/localeExports';
import { getCookieLanguage } from '@/utils';

/**
 * request 数据请求配置
 * */
export const request: RequestConfig = {
  // timeout: 1000,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
        showType: 0,
        errorMessage: resData.message,
      };
    },
  },
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [],
};

/**
 * 项目初次加载时，配置信息
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export interface InitialState {
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserInfo;
  fetchUserInfo?: () => Promise<API.UserInfo | undefined>;
}

export async function getInitialState(): Promise<InitialState> {
  const lang = getCookieLanguage();
  // console.log(lang)
  // 配置页面语言信息
  setLocale(lang, false);
  /**
   * 请求用户信息
   * */
  const fetchUserInfo = async () => {
    try {
      const msg = await httpGetUserInfo();
      // console.log(msg)
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  console.log(888888);
  return {
    fetchUserInfo,
    settings: {},
  };
}

/**
 * ProLayout 布局配置信息
 * ProLayout 支持的api https://procomponents.ant.design/components/layout
 * */
export const layout = ({
  initialState,
}: {
  initialState: InitialState;
}): BasicLayoutProps => {
  // 获取语言
  const locale = getLocale();
  console.log(locale);
  return {
    // 是否删除掉所有的自带界面
    // pure: false,
    title: locale === 'en-US' ? 'Domain Resolution' : '域名解析',
    siderWidth: 180,
    // logo: 'assets/logo-1.png',
    layout: 'mix',
    navTheme: 'light',
    headerTheme: 'light',
    fixedHeader: true,
    fixSiderbar: true,
    loading: false,
    disableContentMargin: true,
    // 控制菜单的收起和展开
    collapsed: false,
    // 自定义 collapsed button 的方法
    collapsedButtonRender: false,
    // 禁止自动切换到移动页面 false
    disableMobile: true,
    headerRender: ({ title }) => {
      return <Header title={title} />;
    },
    // rightContentRender: () => <RightContent />,
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      console.log(currentUser);
      console.log('------ onPageChange ------ ');
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== '/user/login') {
        // TODO: 跳转页面待定
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    // menuDataRender={() => routes}
    /*menuItemRender: (item, dom) => (
      <Link to={item.path}
            onClick={() => {
              console.log(item);
              console.log(dom);
              setPathname(item.path || '/welcome');
            }}
      >
        {dom}
      </Link>
    ),*/
    ...initialState?.settings,
  };
};
