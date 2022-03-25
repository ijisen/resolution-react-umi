import React from 'react';

import styles from './index.less';


const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <img src="/assets/logo-1.png" alt="logo" />
        域名解析
      </div>
      <div className={styles.right}>
        <div className={styles.console}>
          返回
        </div>
        <div className={styles.userInfo}>
          honghong
        </div>
      </div>
    </div>
  );
};

export default Header;
