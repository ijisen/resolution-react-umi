import moment from 'moment';

const net = require('net');

/**
 * 判断日期格式是否合法
 *
 * @param[str] 日期
 */
export const isDate = (str: any) => {
  return moment(str, true).isValid();
};

/**
 * 判断参数是否为数字
 *
 * @param[number] 价格参数
 * @param[allowNegative] 是否允许为负数
 */
export const isNumber = (number: any, allowNegative = false) => {
  /**
   * isNaN([]) || isNaN('') || isNaN(true) || isNaN(false) || isNaN(null) => false
   * */
  if (typeof number === 'string') {
    number = number.replace(/\s+/g, '');
  }
  if (
    isNaN(number) ||
    number === '' ||
    typeof number === 'object' ||
    typeof number === 'boolean'
  ) {
    return false;
  } else {
    number = parseFloat(number);
    if (number < 0) {
      return allowNegative;
    } else {
      return true;
    }
  }
};

/**
 * 域名格式校验
 * FQDN：(Fully Qualified Domain Name)全限定域名：同时带有主机名和域名的名称。（通过符号“.”）
 * 例如：主机名是bigserver,域名是mycompany.com,那么FQDN就是bigserver.mycompany.com。 [1]
 * str: m.zdns.cn || zdns.cn. || h.m.zdns.cn.
 * */
interface IsFQDNOption {
  // 是否校验TLD格式
  require_tld?: boolean;
  // 是否允许 . 号结尾
  allow_trailing_dot: boolean;
  // 是否允许 * 号
  allow_asterisk?: boolean;
  // 是否允许下划线
  allow_underscores?: boolean;
}

export const isFQDN = (str: string, options: IsFQDNOption) => {
  options = options || {
    require_tld: true,
    allow_trailing_dot: true,
    allow_asterisk: false,
    allow_underscores: true,
  };
  // 域名长度限制
  if (str.length > 256) {
    return false;
  }

  /**
   * 校验前， 删除域名尾部的 . 号；www.aaa.cc.
   * Remove the optional trailing dot before checking validity
   * */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }

  // [h,m,zdns,cn] 节点长度
  const parts = str.split('.');
  if (parts.length > 127) {
    return false;
  }

  // TLD 格式校验
  if (options.require_tld) {
    const tld = parts.pop();
    if (
      tld &&
      (!parts.length ||
        !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld))
    ) {
      return false;
    }
  }

  // 域名关键词校验
  for (let part, i = 0; i < parts.length; i++) {
    part = parts[i];

    if (options.allow_underscores) {
      if (part === '_') continue;
      if (part.indexOf('__') >= 0) return false;
      part = part.replace(/_/g, '');
    }

    if (options.allow_asterisk) {
      if (part === '*') continue;
      if (part.indexOf('**') >= 0) return false;
      part = part.replace(/\*/g, '');
    }

    if (!/^[a-z\u00a1-\uffff0-9-]{1,63}$/i.test(part)) {
      return false;
    }

    if (
      part[0] === '-' ||
      part[part.length - 1] === '-' ||
      part.indexOf('---') >= 0
    ) {
      return false;
    }
  }
  return true;
};

/**
 * 字符串 转 数组
 * String to Array
 * */
export const stringToArray = (str: any, separator?: string) => {
  if (typeof str === 'string') {
    str = str.trim();
    return str.split(separator || /\s+/);
  }
  return [];
};

/**
 * 取值范围校验
 * */
export const isInRange = (str: any, min: number, max: number) => {
  if (!isNumber(str)) {
    return false;
  }

  const val = Number(str);
  return val >= min && val <= max;
};

/**
 * 端口号校验
 * */
export const isPort = (str: any) => {
  return isInRange(str, 1, 65535);
};

// is service
export const isService = (str: string) => {
  const arr = str.split(':');
  return arr.length === 2 && net.isIPv4(arr[0]) && isPort(arr[1]);
};

// is telephone
export const isTelephone = (str: string) => {
  const telephoneRegex = /^0\d{2,3}-\d{7,8}(-\d{1,5}){0,1}$/;
  return telephoneRegex.test(str);
};

// is phone
export const isPhone = (str: string) => {
  return isTelephone(str);
  // return isTelephone(str) || isMobilePhone(str, 'zh-CN');
};

// is domain·
export const isDomain = (str: string) => {
  return isFQDN(str, {
    allow_trailing_dot: true,
    allow_underscores: true,
  });
};

// is zone
export const isZone = (str: string) => {
  const rootZone = '.';
  return rootZone === str || isDomain(str);
};

// is host
export const isHost = (str: string) => {
  const specialHosts = '@';
  return (
    str.indexOf(specialHosts) > -1 ||
    isFQDN(str, {
      allow_trailing_dot: false,
      allow_underscores: true,
      allow_asterisk: true,
      require_tld: false,
    })
  );
};

// is ttl
export const isTtl = (str: string | number, maxTTL: 65535) => {
  if (!isNumber(str)) {
    return false;
  }

  if (isNumber(str)) {
    let ttl = Number(str);
    return ttl > 0 && ttl <= maxTTL;
  }
  return false;
};

// is address
export const isAddress = (value: any) => {
  return net.isIPv4(value) || isDomain(value);
};

// is rdata for aw
export const isAW = (str: any) => {
  const values = stringToArray(str);
  return (
    values.length === 2 &&
    isInRange(values[0], 0, 65535) &&
    net.isIPv4(values[1])
  );
};

// is rdata for aaaaw
export const isAAAAW = (str: any) => {
  const values = stringToArray(str);
  return (
    values.length === 2 &&
    isInRange(values[0], 0, 65535) &&
    net.isIPv6(values[1])
  );
};

// is rdata for cnamew
export const isCNAMEW = (str: any) => {
  const values = stringToArray(str);
  return (
    values.length === 2 && isInRange(values[0], 0, 65535) && isDomain(values[1])
  );
};

// is rdata for xw
export const isXW = (str: any) => {
  return isAW(str) || isCNAMEW(str);
};

// is rdata for max
export const isMX = (str: any) => {
  const values = stringToArray(str);
  return (
    values.length === 2 && isInRange(values[0], 1, 65535) && isDomain(values[1])
  );
};

// is rdata for srv
export const isSRV = (str: any) => {
  const values = stringToArray(str);
  return (
    values.length === 4 &&
    isInRange(values[0], 0, 65535) &&
    isInRange(values[1], 0, 65535) &&
    isPort(values[2]) &&
    isDomain(values[3])
  );
};

// is rdata for caa
const caaValueRegex = /^"[\w-:./@]{1,255}"$/;
const caaTags = ['issue', 'issuewild', 'iodef'];
export const isCAA = (str: any) => {
  const values = stringToArray(str);
  return (
    values.length === 3 &&
    isInRange(values[0], 0, 255) &&
    caaTags.indexOf(values[1]) !== -1 &&
    caaValueRegex.test(values[2])
  );
};

// is rdata for trans
export const isTRANS = (str: any) => {
  const values = stringToArray(str);
  return (
    values.length === 2 &&
    isInRange(values[0], 0, 65535) &&
    (net.isIP(values[1]) || isDomain(values[1]))
  );
};

// is rdata
export const isRdata = (str: string, type: string) => {
  switch (type.toUpperCase()) {
    case 'A':
      return net.isIPv4(str);
    case 'AW':
      return isAW(str);
    case 'AAAA':
      return net.isIPv6(str);
    case 'AAAAW':
      return isAAAAW(str);
    case 'NS':
      return isDomain(str);
    case 'MX':
      return isMX(str);
    case 'CNAME':
      return isDomain(str);
    case 'CNAMEW':
      return isCNAMEW(str);
    case 'XW':
      return isXW(str);
    case 'LNAME':
      return isCNAMEW(str);
    case 'DNAME':
      return isDomain(str);
    case 'CAA':
      return isCAA(str);
    case 'SRV':
      return isSRV(str);
    case 'PTR':
      return isDomain(str);
    case 'SPF':
      return isInRange(str.length, 1, 255);
    case 'TXT':
      return isInRange(str.length, 1, 255);
    case 'TRANS':
      return isTRANS(str);
    default:
      return true;
  }
};
