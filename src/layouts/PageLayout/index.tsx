import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

const IndexPage: React.FC = ({ children }) => {
  return (
    <PageContainer content="欢迎使用">
      <h1>111111111</h1>
      {children}
    </PageContainer>
  );
};

export default IndexPage;
