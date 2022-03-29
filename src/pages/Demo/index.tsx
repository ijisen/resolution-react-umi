import React from 'react';
import { useIntl } from 'umi';
import { Button } from 'antd';
export default function Demo() {
  const intl = useIntl();
  return (
    <div>
      <h1>
        {intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Demo.',
        })}
      </h1>
      <Button type="primary">Button</Button>
    </div>
  );
}
