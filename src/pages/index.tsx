import React from 'react';
import styles from './index.less';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { BasicLayoutProps } from '@ant-design/pro-layout/lib/BasicLayout';
import Header from '@/component/Header'

const IndexPage: React.FC = ({ children }) => {
  const config: BasicLayoutProps = {
    location: {
      pathname: '/welcome',
    },
    title: '域名解析',
    logo: 'assets/logo-1.png',
    layout: 'mix',
    navTheme: 'light',
    headerTheme: 'light',
    fixedHeader: true,
    fixSiderbar: true,
  };
  return (
    <ProLayout {...config}
               headerRender={(title, logo) => {
                 return (
                   <Header />
                 )
               }}
               route={{
                 routes: [
                   {
                     path: '/welcome',
                     name: '欢迎',
                     // icon: <SmileOutlined />,
                     component: './Welcome',
                   },
                   {
                     path: '/admin',
                     name: '管理页',
                     // icon: <CrownOutlined />,
                     access: 'canAdmin',
                     component: './Admin',
                     routes: [
                       {
                         path: '/admin/sub-page2',
                         name: '二级页面',
                         component: './Welcome',
                       },
                     ],
                   },
                 ],
               }}
               disableContentMargin>

      <PageContainer content="欢迎使用">
        {children}
      </PageContainer>
    </ProLayout>
  );
};


export default IndexPage;
