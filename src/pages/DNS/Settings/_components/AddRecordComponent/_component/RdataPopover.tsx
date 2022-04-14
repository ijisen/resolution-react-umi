/**
 * 记录值 说明文本
 *
 * */
import React, { FC, memo } from 'react';
import { isLocaleEn } from '@/utils/commont_rely';

const RdataPopover: FC = memo(() => {
  console.log('---- RdataPopover ----');
  if (isLocaleEn()) {
    return (
      <div>
        <p>A: Format: IPv4 address (for example: "8.8.8.8")</p>
        <p>AAAA: Format: IPv6 address (for example: "2401:8d00:4::1")</p>
        <p>CNAME: Format: hostname(for example: www.zdns.cn)</p>
        <p>NS: Format: hostname(for example: ns1.zdns.cn)</p>
        <p>MX: Format: priority(int) hostname(for example: "mx1.zdns.cn"</p>
        <p>
          SRV: Format: priority weight port hostname(for example: "1 0 9
          sysadmins-box.zdns.cn")
        </p>
        <p>TXT: Format: string(for example: "txt record")</p>
        <p>CAA: Format: flag tag value(for example: 0 issue "zdns.cn")</p>
      </div>
    );
  }
  return (
    <div>
      <p>A记录： 记录值是IPv4地址（如：8.8.8.8）</p>
      <p>AAAA记录： 记录值是IPv6地址（如：2401:8d00:4::1）</p>
      <p>
        CNAME记录：
        记录值是域名，一般指向别的域名或者CDN厂商提供的域名。（如：m.zdns.cn）
      </p>
      <p>NS记录： 记录值是域名，指向其他解析平台。（如：m.zdns.cn）</p>
      <p>
        MX记录： 记录值为特定格式，依次为：邮件服务器域名。（如：mx1.zdns.cn）
      </p>
      <p>
        SRV记录： 记录值有特定格式，依次为:优先级 权重 端口 全称域名。(如：1 0 9
        sysadmins-box.zdns.cn)
      </p>
      <p>TXT记录： 记录值可以填写任意字符。</p>
      <p>
        CAA记录： 记录值为特定格式，依次为：flag tag value。（如：0 issue
        "zdns.cn"）
      </p>
    </div>
  );
});

export default RdataPopover;
