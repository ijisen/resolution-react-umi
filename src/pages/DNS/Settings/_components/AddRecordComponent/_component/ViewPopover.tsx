/**
 * 解析线路 说明文本
 *
 * */
import React, { FC, memo } from 'react';
import { isLocaleEn } from '@/utils/commont_rely';

const ViewPopover: FC = memo(() => {
  console.log('---- viewPopover ----');
  if (isLocaleEn()) {
    return (
      <div>
        <p>
          If you have only one IP address or CNAME domain name, be sure to
          select [Default]!
        </p>
        <p>
          default: Before records can be added in non-default view, records must
          be added into default view first.
        </p>
      </div>
    );
  }
  return (
    <div>
      <p>如果只有一个IP地址或CNAME域名，请务必选择【默认】。</p>
      <p>
        默认：必须添加，否则除了指定的智能线路外，其他线路用户均解析不到任何记录值。
      </p>
    </div>
  );
});

export default ViewPopover;
