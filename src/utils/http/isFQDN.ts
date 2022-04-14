import setErrorCodeLang from '../base/setErrorCodeLang';

import { IsFQDNConfig, isFQDNRes } from './typings.d';

/**
 * Error codes and messages.
 * */
const errorCodes = {
  zh: {
    DOMAIN_IS_EMPTY: '校验内容为空',
    DOMAIN_FORMAT_ERROR: '域名格式错误',
    DOMAIN_TOO_SHORT: '域名长度不能小于 1 个字符.',
    DOMAIN_TOO_LONG: '域名长度不能超过 255 个字符.',
    LABEL_STARTS_WITH_DASH: '域名标签不能以 . 开头.',
    LABEL_ENDS_WITH_DASH: '域名标签不能以 . 结尾.',
    LABEL_WITH_HYPHEN: '域名标签不能以 - 开头或结尾.',
    LABEL_TOO_LONG: '域名标签的长度最多为 63 个字符.',
    LABEL_TOO_SHORT: '域名标签应至少为 1 个字符长.',
    LABEL_WITH_UNDERSCORES: '域名标签不能包含 _ ',
    LABEL_ENDS_WITH_UNDERSCORES: '域名标签不能以 _ 结尾.',
    LABEL_INVALID_CHARS:
      '域名标签只能包含a-z、A-Z、0-9、-、_、.、*、@、中文汉字.',
    TLD_WITH_NUMBER: 'TLD不能包含数字.',
    TLD_INVALID_CHARS: 'TLD格式错误.',
  },
  en: {
    DOMAIN_IS_EMPTY: 'Check content is empty',
    DOMAIN_FORMAT_ERROR: 'Domain name format error',
    DOMAIN_TOO_SHORT: 'Domain name too short.',
    DOMAIN_TOO_LONG:
      'Domain name too long. It should be no more than 255 chars.',
    LABEL_STARTS_WITH_DASH: 'Domain name label can not start with a dash.',
    LABEL_ENDS_WITH_DASH: 'Domain name label can not end with a dash.',
    LABEL_WITH_HYPHEN: 'Domain labels cannot start or end with -.',
    LABEL_TOO_LONG: 'Domain name label should be at most 63 chars long.',
    LABEL_TOO_SHORT: 'Domain name label should be at least 1 character long.',
    LABEL_WITH_UNDERSCORES: 'Domain labels cannot contain _',
    LABEL_ENDS_WITH_UNDERSCORES: 'Domain labels can not end with _',
    LABEL_INVALID_CHARS:
      'Domain name label can only contain a-z、A-Z、0-9、-、_、.、*、@、中文汉字.',
    TLD_WITH_NUMBER: 'TLD cannot contain numbers',
    TLD_INVALID_CHARS: 'TLD format error',
  },
};

/**
 * 域名格式校验
 * FQDN：(Fully Qualified Domain Name)全限定域名：同时带有主机名和域名的名称。（通过符号“.”）
 * 例如：主机名是bigserver,域名是mycompany.com,那么FQDN就是bigserver.mycompany.com。 [1]
 * str: m.zdns.cn || zdns.cn. || h.m.zdns.cn.
 * */
const default_fqdn_options = {
  // 是否包含TLD
  require_tld: true,
  // 是否允许包含下划线
  allow_underscores: true,
  // 是否允许 . 号结尾
  allow_trailing_dot: false,
  // 是否允许纯数字TLD
  allow_numeric_tld: false,
  // 是否允许配符 *
  allow_wildcard: false,
};

export default function isFQDN(
  str: any,
  lang?: string,
  options: Partial<IsFQDNConfig> = {},
): isFQDNRes {
  let errorMessage = errorCodes[setErrorCodeLang(lang)];
  if (typeof str !== 'string' || str.replace(' ', '') === '') {
    return {
      success: false,
      message: errorMessage.DOMAIN_IS_EMPTY,
    };
  }

  options = {
    ...default_fqdn_options,
    ...options,
  };
  console.log(options);

  if (!str) {
    return {
      success: false,
      message: errorMessage.DOMAIN_TOO_SHORT,
    };
  }

  const len = str.length;
  if (len > 255) {
    return {
      success: false,
      message: errorMessage.DOMAIN_TOO_LONG,
    };
  }

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[len - 1] === '.') {
    str = str.substring(0, len - 1);
  }

  /* Remove the optional wildcard before checking validity */
  if (options.allow_wildcard && str.indexOf('*.') === 0) {
    str = str.substring(2);
  }

  const nodes = str.split('.');
  console.log(nodes);
  const node_len = nodes.length;
  const max_node = 127;
  if (options.require_tld) {
    // disallow fqdns without tld
    if (node_len < 2) {
      // 域名格式错误  zdns.cn
      return {
        success: false,
        message: errorMessage.DOMAIN_FORMAT_ERROR,
      };
    }

    if (node_len > max_node) {
      return {
        success: false,
        message: errorMessage.DOMAIN_FORMAT_ERROR,
      };
    }

    const tld = nodes[node_len - 1];
    // reject numeric TLDs
    if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
      return {
        success: false,
        message: errorMessage.TLD_WITH_NUMBER,
      };
    }

    if (
      !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(
        tld,
      )
    ) {
      return {
        success: false,
        message: errorMessage.TLD_INVALID_CHARS,
      };
    }
  } else {
    if (node_len > max_node - 1) {
      return {
        success: false,
        message: errorMessage.DOMAIN_FORMAT_ERROR,
      };
    }
  }
  for (let i = 0; i < node_len; i++) {
    const label = nodes[i];
    console.log(label);
    if (label.length > 63) {
      return {
        success: false,
        message: errorMessage.LABEL_TOO_LONG,
      };
    }
    // \u4E00-\u9FA5 \u00a1-\uffff
    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(label)) {
      return {
        success: false,
        message: errorMessage.LABEL_INVALID_CHARS,
      };
    }

    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(label)) {
      return {
        success: false,
        message: errorMessage.LABEL_INVALID_CHARS,
      };
    }

    // disallow node starting or ending with hyphen
    if (/^-|-$/.test(label)) {
      return {
        success: false,
        message: errorMessage.LABEL_WITH_HYPHEN,
      };
    }

    if (!options.allow_underscores && /_/.test(label)) {
      return {
        success: false,
        message: errorMessage.LABEL_WITH_UNDERSCORES,
      };
    }

    // disallow node ending with _
    if (/_$/.test(label)) {
      return {
        success: false,
        message: errorMessage.LABEL_ENDS_WITH_UNDERSCORES,
      };
    }
  }
  return {
    success: true,
    message: '',
  };
}
