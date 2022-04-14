import { EnumLanguageType } from '@/utils/base/typings.d';

const setErrorCodeLang = (lang: any = EnumLanguageType.zh) => {
  if (lang === EnumLanguageType.en) {
    return 'en';
  }
  return 'zh';
};

export default setErrorCodeLang;
