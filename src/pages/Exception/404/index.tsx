import React from 'react';
import { useIntl } from 'umi';
import { Result, Button } from 'antd';
import { onRedirect } from '@/pages/Exception/_common';

export default () => {
  const intl = useIntl();

  return (
    <Result
      status="404"
      title="404"
      style={{
        background: 'none',
      }}
      subTitle={intl.formatMessage({
        id: 'exception404.description.404',
        defaultMessage: 'Sorry, the page you visited does not exist.',
      })}
      extra={
        <Button onClick={onRedirect} type="primary">
          {intl.formatMessage({
            id: 'exception404.exception.back',
            defaultMessage: 'Back Home',
          })}
        </Button>
      }
    />
  );
};
