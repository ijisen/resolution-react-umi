import moment from 'moment';
import _ from '@zdns/keel/underscore';
import validator from './validator-lib';

// is Date
validator.extend('isDate', (str, format) => {
  return moment(str, format, true).isValid();
});

// is fqdn
const default_fqdn_options = {
  require_tld: false,
  allow_asterisk: false,
  allow_underscores: false,
  allow_trailing_dot: false,
};
validator.extend('isFQDN', (str, options) => {
  _.defaults(options, default_fqdn_options);
  if (str.length > 256) {
    return false;
  }

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }

  const parts = str.split('.');
  if (parts.length > 127) {
    return false;
  }

  if (options.require_tld) {
    const tld = parts.pop();
    if (
      !parts.length ||
      !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)
    ) {
      return false;
    }
  }

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
});

// String to Array
validator.extend('toArray', (str, separator) => {
  return _.isString(str) ? validator.trim(str).split(separator || /\s+/) : [];
});

// in range
validator.extend('isInRange', (str, min, max) => {
  if (!validator.isInt(str)) {
    return false;
  }

  const val = validator.toInt(str);
  return val >= min && val <= max;
});

// is string
const stringRegex = /^[-\w\u4E00-\u9FA5\uF900-\uFA2D]+$/;
validator.extend('isString', (str) => {
  return stringRegex.test(str);
});

// is username
validator.extend('isZUsername', (str) => {
  return validator.isEmail(str) || validator.isString(str);
});

// is password
const passwordRegexs = [
  new RegExp('[0-9]'),
  new RegExp('[a-zA-Z]'),
  new RegExp('((?=[\x21-\x7e]+)[^A-Za-z0-9])'),
];
validator.extend('isZPassword', (str) => {
  if (str && (str.length < 8 || str.length > 20)) {
    return false;
  }

  let rulesCount = 0;
  _.each(passwordRegexs, (regx) => {
    if (regx.test(str)) rulesCount += 1;
  });
  return rulesCount >= 2;
});

// is NonNegative
const nonNegativeRegex = /^[0-9]+$/;
validator.extend('isNonNegative', (str) => {
  return nonNegativeRegex.test(str);
});

// is ipv4 network
const networkSeparator = '/';
validator.extend('isIPv4Network', (str) => {
  const arr = str.split(networkSeparator);
  return (
    arr.length === 2 &&
    validator.isIP(arr[0], 4) &&
    validator.isInRange(arr[1], 8, 32)
  );
});

// is port
validator.extend('isPort', (str) => {
  return validator.isInRange(str, 1, 65535);
});

// is ports
validator.extend('isPorts', (str, separator) => {
  const ports = _.uniq(validator.toArray(str, separator));

  return _.isUndefined(
    _.find(ports, (port) => {
      return !validator.isPort(port);
    }),
  );
});

// is service
const serviceSeparator = ':';
validator.extend('isService', (str) => {
  const arr = str.split(serviceSeparator);
  return (
    arr.length === 2 && validator.isIP(arr[0], 4) && validator.isPort(arr[1])
  );
});

// is services
validator.extend('isServices', (str, separator) => {
  const services = validator.toArray(str, separator);

  return _.isUndefined(
    _.find(services, (service) => {
      return !validator.isService(service);
    }),
  );
});

// is domains
validator.extend('isDomains', (str, separator) => {
  const domains = validator.toArray(str, separator);

  return _.isUndefined(
    _.find(domains, (domain) => {
      return !validator.isDomain(domain);
    }),
  );
});

// is domainwithroot width root domain
validator.extend('isDomainWithRoot', (str, _separator) => {
  if (str === '.') return true;
  return validator.isDomain(str);
});

// is hosts
validator.extend('isHosts', (str, separator) => {
  const hosts = validator.toArray(str, separator);

  return _.isUndefined(
    _.find(hosts, (host) => {
      return !validator.isHost(host);
    }),
  );
});

// is ips
validator.extend('isIPs', (str, version, separator) => {
  const ips = validator.toArray(str, separator);

  return _.isUndefined(
    _.find(ips, (ip) => {
      return !validator.isIP(ip, version);
    }),
  );
});

// is acls
validator.extend('isAcls', (str, separator) => {
  const addrs = _.uniq(validator.toArray(str, separator));

  return (
    addrs.length <= 20000 &&
    _.isUndefined(
      _.find(addrs, (addr) => {
        return !(validator.isIP(addr, 4) || validator.isIPv4Network(addr));
      }),
    )
  );
});

// is emails
validator.extend('isEmails', (str, separator) => {
  const emails = validator.toArray(str, separator);

  return _.isUndefined(
    _.find(emails, (email) => {
      return !validator.isEmail(email);
    }),
  );
});

// is telephone
const telephoneRegex = /^0\d{2,3}-\d{7,8}(-\d{1,5}){0,1}$/;
validator.extend('isTelephone', (str) => {
  return telephoneRegex.test(str);
});

// is phone
validator.extend('isPhone', (str) => {
  return validator.isTelephone(str) || validator.isMobilePhone(str, 'zh-CN');
});

// is mobile phones
validator.extend('isMobilePhones', (str, separator) => {
  const phones = _.uniq(validator.toArray(str, separator));

  return _.isUndefined(
    _.find(phones, (phone) => {
      return !validator.isMobilePhone(phone, 'zh-CN');
    }),
  );
});

// is wechat
const wechatRegex = /^[^</>]{1,32}$/;
validator.extend('isWechat', (str) => {
  return wechatRegex.test(str);
});

// is wechats
validator.extend('isWechats', (str, separator) => {
  const wechats = _.uniq(validator.toArray(str, separator));

  return _.isUndefined(
    _.find(wechats, (wechat) => {
      return !validator.isWechat(wechat);
    }),
  );
});

// is domain
validator.extend('isDomain', (str) => {
  return validator.isFQDN(str, {
    allow_trailing_dot: true,
    allow_underscores: true,
  });
});

// is zone
const rootZone = '.';
validator.extend('isZone', (str) => {
  return _.isEqual(rootZone, str) || validator.isDomain(str);
});

// is host
const specialHosts = ['@'];
validator.extend('isHost', (str) => {
  return (
    _.contains(specialHosts, str) ||
    validator.isFQDN(str, {
      allow_trailing_dot: false,
      allow_underscores: true,
      allow_asterisk: true,
      require_tld: false,
    })
  );
});

// is ttl
const maxTtlValue = 2 ** 31 - 1;
validator.extend('isTtl', (str) => {
  if (!validator.isInt(str)) {
    return false;
  }

  const ttl = validator.toInt(str);
  return ttl > 0 && ttl <= maxTtlValue;
});

// is address
validator.extend('isAddress', (value) => {
  return validator.isIP(value, 4) || validator.isDomain(value);
});

// is rdata for aw
validator.extend('isAW', (str) => {
  const values = validator.toArray(str);
  return (
    values.length === 2 &&
    validator.isInRange(values[0], 0, 65535) &&
    validator.isIP(values[1], 4)
  );
});

// is rdata for aaaaw
validator.extend('isAAAAW', (str) => {
  const values = validator.toArray(str);
  return (
    values.length === 2 &&
    validator.isInRange(values[0], 0, 65535) &&
    validator.isIP(values[1], 6)
  );
});

// is rdata for cnamew
validator.extend('isCNAMEW', (str) => {
  const values = validator.toArray(str);
  return (
    values.length === 2 &&
    validator.isInRange(values[0], 0, 65535) &&
    validator.isDomain(values[1])
  );
});

// is rdata for xw
validator.extend('isXW', (str) => {
  return validator.isAW(str) || validator.isCNAMEW(str);
});

// is rdata for max
validator.extend('isMX', (str) => {
  const values = validator.toArray(str);
  return (
    values.length === 2 &&
    validator.isInRange(values[0], 1, 65535) &&
    validator.isDomain(values[1])
  );
});

// is rdata for srv
validator.extend('isSRV', (str) => {
  const values = validator.toArray(str);
  return (
    values.length === 4 &&
    validator.isInRange(values[0], 0, 65535) &&
    validator.isInRange(values[1], 0, 65535) &&
    validator.isPort(values[2]) &&
    validator.isDomain(values[3])
  );
});

// is rdata for caa
const caaValueRegex = /^"[\w-:./@]{1,255}"$/;
const caaTags = ['issue', 'issuewild', 'iodef'];
validator.extend('isCAA', (str) => {
  const values = validator.toArray(str);
  return (
    values.length === 3 &&
    validator.isInRange(values[0], 0, 255) &&
    caaTags.indexOf(values[1]) !== -1 &&
    caaValueRegex.test(values[2])
  );
});

// is rdata for trans
validator.extend('isTRANS', (str) => {
  const values = validator.toArray(str);
  return (
    values.length === 2 &&
    validator.isInRange(values[0], 0, 65535) &&
    (validator.isIP(values[1], 4) ||
      validator.isIP(values[1], 6) ||
      validator.isDomain(values[1]))
  );
});

// is rdata
validator.extend('isRdata', (str, type) => {
  switch (type.toUpperCase()) {
    case 'A':
      return validator.isIP(str, 4);
    case 'AW':
      return validator.isAW(str);
    case 'AAAA':
      return validator.isIP(str, 6);
    case 'AAAAW':
      return validator.isAAAAW(str);
    case 'NS':
      return validator.isDomain(str);
    case 'MX':
      return validator.isMX(str);
    case 'CNAME':
      return validator.isDomain(str);
    case 'CNAMEW':
      return validator.isCNAMEW(str);
    case 'XW':
      return validator.isXW(str);
    case 'LNAME':
      return validator.isCNAMEW(str);
    case 'DNAME':
      return validator.isDomain(str);
    case 'CAA':
      return validator.isCAA(str);
    case 'SRV':
      return validator.isSRV(str);
    case 'PTR':
      return validator.isDomain(str);
    case 'SPF':
      return validator.isInRange(str.length, 1, 255);
    case 'TXT':
      return validator.isInRange(str.length, 1, 255);
    case 'TRANS':
      return validator.isTRANS(str);
    default:
      return true;
  }
});

// is rdatas
validator.extend('isRdatas', (str, type) => {
  const rdatas = validator.toArray(str, '\n');

  return _.isUndefined(
    _.find(rdatas, (rdata) => {
      return !validator.isRdata(rdata, type);
    }),
  );
});

// is ip or network list
validator.extend('isIpsOrNetworks', (str) => {
  const ipOrNetworkList = validator.toArray(str);

  return _.every(ipOrNetworkList, (ipOrNetwork) => {
    if (ipOrNetwork.includes('/')) {
      const l = ipOrNetwork.split('/');
      if (l.length !== 2) {
        return false;
      }
      const i = l[0];
      const m = parseInt(l[1], 10);
      if (validator.isIP(i, 4)) {
        if (m < 0 || m > 32) return false;
        return true;
      } else if (validator.isIP(i, 6)) {
        if (m < 0 || m > 128) return false;
        return true;
      } else {
        return false;
      }
    }
    return validator.isIP(ipOrNetwork, 4) || validator.isIP(ipOrNetwork, 6);
  });
});

export default validator;
