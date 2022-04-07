import React from 'react';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { useModel } from '@@/plugin-model/useModel';

import styles from './index.less';

const Header: React.FC<HeaderViewProps> = ({ title, logo }) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {typeof logo === 'string' && <img src={logo} alt="logo" />}
        {title}
      </div>
      <div className={styles.right}>
        <div className={styles.userInfo}>{currentUser?.userName}</div>
      </div>
    </div>
  );
};

export default Header;
