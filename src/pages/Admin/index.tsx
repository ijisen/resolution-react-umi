import React from 'react';

const PageContent: React.FC = ({ children } = {}) => (
  <div style={{ height: 800 }}>
    <h1> Admin </h1>
    {children}
  </div>
);

export default PageContent;
