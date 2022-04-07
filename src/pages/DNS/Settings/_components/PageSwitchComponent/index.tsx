import React, { FC } from 'react';
import { Select } from 'antd';
import { setLanguage } from '@/utils/commont_rely';

/** 分页切换组件 - Paging switch*/

interface PageInit {
  loading: boolean;
  pageSize?: number;
  onChange: (pageSize: number) => void;
}

const { Option } = Select;

const PageSwitch: FC<PageInit> = ({ loading, pageSize, onChange }) => {
  const pageSizeInfo = [10, 20, 30, 50];

  return (
    <div className="pbl">
      <Select
        disabled={loading}
        className="text-ct"
        style={{ minWidth: 60 }}
        size="small"
        onChange={onChange}
        defaultValue={pageSize}
      >
        {pageSizeInfo.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      <span className="plm">{setLanguage('keyword.page.size')}</span>
    </div>
  );
};
export default PageSwitch;
