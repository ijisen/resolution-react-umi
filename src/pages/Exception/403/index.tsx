import React from 'react';
import { useIntl } from 'umi';
import { Result, Button } from 'antd';
import { onRedirect } from '@/pages/Exception/_common';

export default () => {
  const intl = useIntl();
  return (
    <Result
      status="403"
      title="403"
      style={{
        background: 'none',
      }}
      subTitle={intl.formatMessage({
        id: 'exception403.description.403',
        defaultMessage: "Sorry, you don't have access to this page.",
      })}
      extra={
        <Button onClick={onRedirect} type="primary">
          {intl.formatMessage({
            id: 'exception403.exception.back',
            defaultMessage: 'Back Home',
          })}
        </Button>
      }
    />
  );
};
