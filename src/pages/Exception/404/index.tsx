import { Link } from 'umi';
import { Result, Button } from 'antd';
import React from 'react';

export default () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none'
    }}
    subTitle="exception404.description.404"
    extra={
      <Link to="/">
        <Button type="primary" >exception404.exception.back</Button>
      </Link>
    }
  />
);
