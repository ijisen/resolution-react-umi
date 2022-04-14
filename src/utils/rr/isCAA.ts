/**
 * CAA  =>  CA证书颁发机构授权校验
 *  使用场景： CAA(Certificate Authority Authorization)，即证书颁发机构授权。是一项新的可以添加到DNS记录中的额外字段,通过DNS机制创建CAA资源记录，可以限定域名颁发的证书和CA（证书颁发机构）之间的联系。未经授权的第三方尝试通过其他CA注册获取用于该域名的SSL/TLS证书将被拒绝。
 *  域名设置 CAA 记录，使网站所有者，可授权指定CA机构为自己的域名颁发证书，以防止HTTPS证书错误签发，从而提高网站安全性。
 *  CAA记录的格式为： [flag] [tag] [value]，是由一个标志字节的[flag]和一个被称为属性的[tag]-[value]（标签-值）对组成。您可以将多个CAA字段添加到域名的DNS记录中。
 * ------> [flag]：无符号整数（目前仅支持0和128），用于标志认证机构。通常情况下填0，表示如果颁发证书机构无法识别本条信息，就忽略。
 * ------> [tag]：支持 issue、issuewild 和 iodef。
 * --------> issue：CA授权单个证书颁发机构发布的 任何类型 域名证书。
 * --------> issuewild：CA授权单个证书颁发机构发布主机名的 通配符 证书。
 * --------> iodef：CA可以将违规的颁发记录URL发送给某个电子邮箱。
 * ------> [value]： CA的域名或用于违规通知的电子邮箱。
 */
import stringToArray from '../base/stringToArray';
import setErrorCodeLang from '../base/setErrorCodeLang';
import isInRange from '../isInRange';

/**
 * Error codes and messages.
 * */
const errorCodes = {
  zh: {
    FORMAT_ERROR: 'CAA记录的记录值为字符串形式, 如：0 issue "ca.example.com"',
  },
  en: {
    FORMAT_ERROR:
      'Specify your TXT Record value as a string, (eg: 0 issue "ca.example.com" ).',
  },
};

// （如：0 iodef "mailto:admin@dns-example.com"）
// （如：0 issue "symantec.com"）
const isCAA = (str: any, lang?: string) => {
  const caaValueRegex = /^"[\w-:./@]{1,255}"$/;
  const caaTags = ['issue', 'issuewild', 'iodef'];
  const values = stringToArray(str);
  const success =
    values.length === 3 &&
    isInRange(values[0], 0, 255) &&
    caaTags.indexOf(values[1]) !== -1 &&
    caaValueRegex.test(values[2]);
  const error_code = errorCodes[setErrorCodeLang(lang)];
  return {
    success,
    message: success ? '' : error_code.FORMAT_ERROR,
  };
};

export default isCAA;
