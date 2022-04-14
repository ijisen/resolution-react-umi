/**
 * SRV【服务定位（SRV）资源记录】  => 记录提供特定的服务的服务器
 *  使用场景： SRV 记录用来标识某台服务器使用了某个服务，常见于微软系统的目录管理。
 *  主机记录： 格式为 服务的名字.协议的类型。
 *    例如：_sip._tcp
 *  解析线路： 默认 为必选项，未设置默认线路会导致部分用户无法解析
 *  记录值： 格式为 【优先级】 【权重】 【端口】 目标地址 ，每项中间需以空格分隔。
 *    例如：0 5 5060 sipserver.example.com
 *  TTL：为缓存时间，数值越小，修改记录各地生效时间越快，默认为10分钟。

 * */

import isInRange from '../isInRange';
import stringToArray from '../base/stringToArray';
import setErrorCodeLang from '../base/setErrorCodeLang';
import isDomain from '../http/isDomain';
import isPort from '../http/isPort';

/**
 * Error codes and messages.
 * */
const errorCodes = {
  zh: {
    FORMAT_ERROR:
      'SRV记录格式为： 优先级 权重 端口 目标地址 ，每项中间需以空格分隔。例如 “0 5 5060 sipserver.example.com”。',
  },
  en: {
    FORMAT_ERROR:
      'The format of an SRV record is: [Priority] [Weight] [Port number] [Target address]. Separate the priority, weight, port number, and target address with spaces. Example: 0 5 5060 sipserver.example.com',
  },
};

export default (str: string, lang?: string) => {
  const values = stringToArray(str);
  const { success } = isDomain(str, lang);
  const _success =
    values.length === 4 &&
    isInRange(values[0], 0, 65535) &&
    isInRange(values[1], 0, 65535) &&
    isPort(values[2]) &&
    success;
  const error_code = errorCodes[setErrorCodeLang(lang)];
  return {
    success: _success,
    message: _success ? '' : error_code.FORMAT_ERROR,
  };
};
