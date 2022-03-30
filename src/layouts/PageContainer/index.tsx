import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import styles from './index.less';

const IndexPage: React.FC = ({ children }) => {
  return (
    <PageContainer
      title={false}
      loading={false}
      className={styles.PageContainer}
    >
      {children}
    </PageContainer>
  );
};

export default IndexPage;
