import React from 'react';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';

import styles from './index.less';
import { useModel } from '@@/plugin-model/useModel';

const Header: React.FC<HeaderViewProps> = ({ title, logo }) => {
  console.log(title);
  const { initialState, setInitialState } = useModel('@@initialState');
  console.log(initialState);
  const { currentUser } = initialState || {};
  console.log(currentUser);
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <img src="/assets/logo-1.png" alt="logo" />
        {title}
      </div>
      <div className={styles.right}>
        <div className={styles.console}>返回</div>
        <div className={styles.userInfo}>{currentUser?.userName}</div>
      </div>
    </div>
  );
};

export default Header;
