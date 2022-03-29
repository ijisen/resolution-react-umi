/**
 * 当前系统选择的语言读取
 */
import { getCookieValue } from '@/utils/cookieStorage';

export const getCookieLanguage = () => {
  let language = getCookieValue('language');
  // cookie 语言值 zh_CN || cn || en
  console.log(language);
  language = language ? language.toLocaleLowerCase() : 'zh';
  console.log(language);
  if (language === 'en') {
    return 'en-US';
  }
  return 'zh-CN';
};

/**
 * 当前系统是否为英文
 */
export const isEnLanguage = () => {
  let language = getCookieLanguage();
  return language === 'en';
};
