/**
 *
 * 主机记录说明文本
 *
 * */
import React, { FC, memo } from 'react';
import { isLocaleEn } from '@/utils/commont_rely';

const HostPopover: FC = memo(() => {
  console.log('---- HostPopover ----');
  if (isLocaleEn()) {
    return (
      <div>
        <p>Hostname refers to the prefix before the domain names:</p>
        <p>www: Use www to match www.yourdomain.tld.</p>
        <p>
          @: Use @ to exactly match the original domain name (for example,
          yourdomain.tld).
        </p>
        <p>
          *: Use * (asterisk) as a wildcard to match any prefix. For example,
          *.zdns.cn matches &lt;any prefix&gt; .zdns.cn.
        </p>
        <p>
          mail: Use mail to match mail.yourdomain.com. It is typically used for
          mail server resolution.
        </p>
        <p>
          Second-level domain name: For example, to match abc.yourdomain.com,
          enter abc.
        </p>
        <p>Mobile website: For example, to match m.yourdomain.com, enter m.</p>
      </div>
    );
  }
  return (
    <div>
      <p>主机记录就是域名前缀，常见用法有：</p>
      <p>www：解析后的域名为www.zdns.cn。</p>
      <p>@：直接解析主域名 zdns.cn。</p>
      <p>*：泛解析，匹配其他所有域名 *.zdns.cn。</p>
      <p>mail：将域名解析为mail.zdns.cn，通常用于解析邮箱服务器。</p>
      <p>二级域名：如：abc.zdns.cn，填写abc。</p>
      <p>手机网站：如：m.zdns.cn，填写m。</p>
    </div>
  );
});

export default HostPopover;
