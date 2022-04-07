import React, { FC, useEffect } from 'react';
import { Button, Layout, Result } from 'antd';
import { getSessionStorage } from '@/utils/sessionStorage';
import { setLanguage } from '@/utils/commont_rely';

const { Content } = Layout;

const PageContent: FC = (props) => {
  const redirect = getSessionStorage('redirect');

  useEffect(() => {}, []);

  return (
    <Layout className="zdns-page-layout">
      <Content className="text-ct">
        <Result status="error" title={setLanguage('2002')} />
        {redirect && (
          <Button
            className="mbl"
            type="primary"
            onClick={() => {
              window.location.href = redirect;
            }}
          >
            {setLanguage('keyword.return.home')}
          </Button>
        )}
      </Content>
    </Layout>
  );
};

export default PageContent;
