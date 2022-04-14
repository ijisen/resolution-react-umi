/**
 * MX【邮件交换记录 - Mail Exchanger】  => 将域名指向邮件服务器地址
 *  使用场景：设置邮箱时，让邮箱能收到邮件，就需要添加 MX 记录。MX全称为mail exchanger，用于电子邮件系统发邮件时根据收信人的地址后缀来定位邮件服务器。例如，当有人发邮件给“vincen@example.com”时，系统将对“example.com”进行DNS中的MX记录解析。如果MX记录存在，系统就根据MX记录的优先级，将邮件转发到与该MX相应的邮件服务器上。
 *  主机记录：一般是指子域名的前缀，（要做xxx@dns-example.com的邮箱，所以主机记录输入“ @ ”；要做xxx@mail.dns-example.com，如果主机记录填 mail）。
 *  解析线路：默认为必填项，否则会导致部分用户无法解析，邮件无法收取；
 *  记录值：输入内容通过联系邮箱注册商提供。例如阿里云邮提供的需要配置的解析记录值是 mx1.qiye.aliyun.com；
 *  MX优先级：输入内容通过联系邮箱注册商提供，MX 优先级的数值越低，优先级别就越高（如下图，邮件会先尝试发送到 MX 优先级为 5 的mx1.qiye.aliyun.com，如果尝试失败，才会发送到 MX 优先级为10 的mx2.qiye.aliyun.com）。
 *  TTL：为缓存时间，数值越小，修改记录各地生效时间越快，默认为10分钟。
 *
 * */

import setErrorCodeLang from '../base/setErrorCodeLang';
import isDomain from '../http/isDomain';

/**
 * Error codes and messages.
 * */
const errorCodes = {
  zh: {
    FORMAT_ERROR: 'MX记录的记录值为域名形式（如: abc.example.com）',
  },
  en: {
    FORMAT_ERROR:
      'The MX record value is in the domain name format (eg: abc.example.com).',
  },
};

const isMX = (str: string, lang?: string) => {
  const error_code = errorCodes[setErrorCodeLang(lang)];
  const { success } = isDomain(str, lang);
  return {
    success: success,
    message: success ? '' : error_code.FORMAT_ERROR,
  };
};

export default isMX;
