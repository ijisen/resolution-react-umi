import isFQDN from './isFQDN';

// is domain·
const isDomain = (str: string, lang?: string) => {
  return isFQDN(str, lang, {
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
  });
};

export default isDomain;
