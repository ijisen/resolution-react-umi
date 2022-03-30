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

/**
 * @names：特殊符号转 , 英文号
 * @params[str] string
 * @return string
 * */
export const specialSymbolToComma = (str: string) => {
  return str.replace(/\r|\s|\n|，/g, ',');
};

/**
 * @names：textarea 输入内容格式化
 * @params[str] string  aaa,bbb,ccc,dd
 * @return [] Array
 * */
const inputTextareaFormat = (str: string) => {
  // 去除首尾空格
  str = str.trim();
  // 大写转小写
  str = str.toLowerCase();
  // 去除多余的空格
  str = str.replace(/\s+|\n+/g, ' ');
  // 特殊符号转 ,
  str = specialSymbolToComma(str);
  // 去重
  return [...new Set(str.split(','))];
};

/**
 * @names：普通文本空格过滤
 * @params[str] string
 * @return string
 * */
export const filterInputTextSpace = (str: string) => {
  return str.replace(/\s+/g, ' ').trim();
};
