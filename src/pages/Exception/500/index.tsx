import React from 'react';
import { useIntl } from 'umi';
import { Result, Button } from 'antd';
import { onRedirect } from '@/pages/Exception/_common';

export default () => {
  const intl = useIntl();
  return (
    <Result
      status="500"
      title="500"
      style={{
        background: 'none',
      }}
      subTitle={intl.formatMessage({
        id: 'exception500.description.500',
        defaultMessage: 'Sorry, the server is reporting an error.',
      })}
      extra={
        <Button onClick={onRedirect} type="primary">
          {intl.formatMessage({
            id: 'exception500.exception.back',
            defaultMessage: 'Back Home',
          })}
        </Button>
      }
    />
  );
};
