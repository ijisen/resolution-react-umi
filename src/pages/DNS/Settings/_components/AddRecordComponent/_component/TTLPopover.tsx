/**
 * TTL 说明文本
 *
 * */
import React, { FC, memo } from 'react';
import { isLocaleEn } from '@/utils/commont_rely';

interface PageProps {
  min: number;
  max: number;
  defaults: number;
}

const TTLPopover: FC<PageProps> = memo(({ min, max, defaults }) => {
  console.log('---- TTLPopover ----');
  if (isLocaleEn()) {
    return (
      <div>
        <p>
          Tips: Default: {defaults} seconds, min: {min} seconds, max: {max}{' '}
          seconds
        </p>
        <p>TTL:Time To Live</p>
        <p>
          {defaults} seconds: Default: {defaults} seconds
        </p>
        <p>
          short TTL: If your DNS records changes frequently, or you want the DNS
          changes to take effect quickly, you can set a short TTL, for example
          60 seconds.
        </p>
        <p>
          long TTL: If your DNS records seldom changes, you can set a long TTL,
          for example {max} seconds.
        </p>
      </div>
    );
  }
  return (
    <div>
      <p>
        温馨提示： 系统默认的是{defaults}秒，请根据需要修改，最小支持{min}秒，
        最大支持 {max}{' '}
      </p>
      <p>
        TTL即Time To
        Live，生存时间。通常指运营商LocalDNS缓存您域名解析记录的时间，缓存失效后会再次到DNS云服务获取新的记录。
      </p>
      <p>
        {defaults}（1小时）： 建议正常情况下使用默认的{defaults}秒。
      </p>
      <p>
        更小的TTL时间 ：
        如果您的解析记录经常变更，或者配置了宕机切换功能希望切换后尽快生效，可将TTL设置的更小一些，比如：60秒（1分钟）。
      </p>
      <p>
        更大的TTL时间：
        如果您的解析记录很少变更，希望LocalDNS缓存更长时间来提升用户解析速度，可将TTL设置的更大一些，比如：7200秒（2小时）。
      </p>
    </div>
  );
});

export default TTLPopover;
