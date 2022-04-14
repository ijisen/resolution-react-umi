/**
 * 解析记录校验公共方法
 *
 * */

import isA from './isA';
import isAAAA from './isAAAA';
import isCNAME from './isCNAME';
import isMX from './isMX';
import isTXT from './isTXT';
import isNS from './isNS';
import isCAA from './isCAA';
import isSRV from './isSRV';

import { EnumLanguageType } from '../base/typings.d';
import { EnumRecordType } from './typings.d';

// is rdata
const isRdata = (
  str: string,
  type: EnumRecordType,
  lang?: string,
): {
  success: boolean;
  message: string;
} => {
  switch (type.toUpperCase()) {
    case EnumRecordType.A:
      return isA(str, lang);
    case EnumRecordType.AAAA:
      return isAAAA(str, lang);
    case EnumRecordType.CNAME:
      return isCNAME(str, lang);
    case EnumRecordType.MX:
      return isMX(str, lang);
    case EnumRecordType.TXT:
      return isTXT(str, {
        lang,
      });
    case EnumRecordType.NS:
      return isNS(str, lang);
    case EnumRecordType.CAA:
      return isCAA(str, lang);
    case EnumRecordType.SRV:
      return isSRV(str, lang);
    default:
      return { success: false, message: '位置记录类型！' };
  }
};

export default isRdata;
