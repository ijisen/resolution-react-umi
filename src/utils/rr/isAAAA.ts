/**
 * AAAA【AAAA record】  => 将域名指向一个IPV6地址
 * 使用场景：当预期是实现访问者通过 IPv6 地址访问网站，可以使用 AAAA 记录实现。
 * 主机记录：一般是指子域名的前缀（如需创建子域名为www.dns-example.com, 主机记录输入 www；如需实现dns-example.com，主机记录输入 @）
 * 解析线路：默认为必选项，未设置会导致部分用户无法访问；
 * 记录值：记录值为IP地址，填写 IPV6 地址
 * TTL：为缓存时间，数值越小，修改记录各地生效时间越快，默认为10分钟。
 *
 * */
import setErrorCodeLang from '../base/setErrorCodeLang';
import { isIPv6 } from '../http/IP';

/**
 * Error codes and messages.
 * */
const errorCodes = {
  zh: {
    FORMAT_ERROR: 'AAAA记录的记录值为IPv6形式（如: ff03:0:0:0:0:0:0:c1）',
  },
  en: {
    FORMAT_ERROR:
      'The AAAA record value is in the IPv6 format (eg: ff03:0:0:0:0:0:0:c1).',
  },
};

const isAAAA = (str: string, lang?: string) => {
  const error_code = errorCodes[setErrorCodeLang(lang)];
  const success = isIPv6(str);
  return {
    success,
    message: success ? '' : error_code.FORMAT_ERROR,
  };
};

export default isAAAA;
