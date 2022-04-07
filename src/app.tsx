import React from 'react';
import { history, RequestConfig, getLocale, setLocale } from 'umi';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BasicLayoutProps } from '@ant-design/pro-layout';

import Header from '@/component/Header';

import {
  errorHandler,
  middlewares,
  requestInterceptors,
  responseInterceptors,
} from '@/utils/request';
import { getCookieLanguage } from '@/utils';
import { isLocaleEn } from '@/utils/commont_rely';
import { getSessionStorage, setSessionStorage } from '@/utils/sessionStorage';

import { httpGetUserInfo } from '@/services';

import { InitialState, EnumDictKey } from '@/types/basic.d';

const { NODE_ENV } = process.env;

/**
 * request 数据请求配置
 * */
export const request: RequestConfig = {
  timeout: 60000,
  prefix: NODE_ENV === 'development' ? '/api' : '',
  // 跳过 umi-request 错误处理中间件
  skipErrorHandler: true,
  errorHandler,
  middlewares,
  requestInterceptors,
  responseInterceptors,
};

/**
 * 项目初次加载时，配置信息
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState(): Promise<InitialState> {
  console.log('----getInitialState----');
  const { redirect } = history.location.query || {};
  redirect && setSessionStorage(EnumDictKey.REDIRECT, redirect);

  const loginPath = getSessionStorage(EnumDictKey.REDIRECT) || '/user/login';

  // 配置页面语言信息
  setLocale(getCookieLanguage(), false);
  /**
   * 请求用户信息
   * */
  const fetchUserInfo = async () => {
    try {
      const res = await httpGetUserInfo();
      console.log(res);
      if (res && res.success) {
        let resData = res.data;
        if (resData && resData?.userId) {
          return resData;
        }
      }
      return undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  const currentUser = await fetchUserInfo();
  document.getElementById('app-page-loading')?.remove();
  console.log(`get currentUser: ${currentUser}`);

  const isLoginPage = history.location.pathname === loginPath;
  if (currentUser) {
    // 已登录  是登录页 返回首页
    if (isLoginPage) {
      history.push('/');
    }
  } else {
    // 未登录  不是登录页 返回登录页
    if (!isLoginPage) {
      history.push(loginPath);
    }
  }
  return {
    fetchUserInfo,
    currentUser,
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
  console.log('---- ProLayout ----');
  // 获取语言
  const isEn = isLocaleEn();
  // console.log(locale);
  return {
    // 是否删除掉所有的自带界面
    // pure: false,
    title: isEn ? 'Domain Resolution' : '域名解析',
    logo: '/assets/logo-3.png',
    className: 'zdns-basic-layout',
    siderWidth: 180,
    loading: false,
    layout: 'mix',
    navTheme: 'light',
    headerTheme: 'light',
    fixedHeader: true,
    fixSiderbar: true,
    disableContentMargin: true,
    // 控制菜单的收起和展开
    collapsed: false,
    // 自定义 collapsed button 的方法
    collapsedButtonRender: false,
    // 禁止自动切换到移动页面 false
    disableMobile: true,
    headerRender: ({ title, logo }) => {
      return <Header title={title} logo={logo} />;
    },
    menuHeaderRender: () => {
      const redirect = getSessionStorage(EnumDictKey.REDIRECT);
      if (!redirect) {
        return false;
      }
      return (
        <div
          onClick={() => (window.location.href = redirect)}
          className="menu-header-render"
        >
          <ArrowLeftOutlined />
          <span>{isEn ? 'Return' : '返回'}</span>
        </div>
      );
    },
    onPageChange: () => {
      const { currentUser } = initialState || {};
      const { location } = history;
      console.log(currentUser);
      console.log('------ onPageChange ------ ');
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    ...initialState?.settings,
  };
};
