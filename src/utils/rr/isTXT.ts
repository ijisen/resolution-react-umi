/**
 * TXT  => 文本长度限制512，通常做SPF记录（反垃圾邮件）
 *  使用场景：如果希望对域名进行标识和说明，可以使用 TXT 记录， TXT 记录多用来做 SPF 记录（反垃圾邮件）。
 *  主机记录：一般是指子域名的前缀（如需为子域名为 www.dns-example.com 添加 TXT 记录， 主机记录输入 www；如需为dns-example.com添加TXT记录，主机记录输入 @）
 *  解析线路：默认 为必选项，未设置会导致部分用户无法解析。
 *  记录值：常用情况TXT 记录是用来做 SPF 反垃圾邮件的，最典型的 SPF 格式的 TXT 记录例子为“v=spf1 a mx ~all”，表示只有这个域名的 A 记录和 MX 记录中的 IP 地址有权限使用这个域名发送邮件。
 *  TTL：为缓存时间，数值越小，修改记录各地生效时间越快，默认为10分钟。
 *
 * */

import setErrorCodeLang from '@/utils/base/setErrorCodeLang';

/**
 * TXT记录，一般指某个主机名或域名的标识和说明。
 * 如：admin IN TXT "管理员, 电话：XXXXXXXXXXX"，mail IN TXT "邮件主机，存放在xxx , 管理人：AAA"，Jim IN TXT "contact: abc@mailserver.com"，也就是说，通过设置TXT记录内容可以使别人更方便地联系到你。TXT 记录常用的方式还有做 SPF 记录（反垃圾邮件）和SSL证书的DNS验证等。
 * */

interface Default_Option {
  min: number;
  max: number;
  lang: string;
}

/**
 * Error codes and messages.
 * */
const errorCodes = {
  zh: {
    TOO_LONG: 'TXT记录值长度限制 255 个字符.',
  },
  en: {
    TOO_LONG: 'The TXT record value must be 1 to 255 characters in length.',
  },
};

const isTXT = (str: string, option: Partial<Default_Option> = {}) => {
  const min = option.min || 1;
  const max = option.min || 255;
  const error_code = errorCodes[setErrorCodeLang(option.lang)];
  const success = !(str.length > max || str.length < min);
  return {
    success,
    message: success ? '' : error_code.TOO_LONG,
  };
};
export default isTXT;
