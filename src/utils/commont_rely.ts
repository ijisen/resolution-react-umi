import { useIntl, getLocale } from 'umi';
import { EnumLanguageType } from '@/types/basic.d';

export const setLanguage = (keys: string) => {
  const intl = useIntl();
  return intl.formatMessage({
    id: keys,
    defaultMessage: '-',
  });
};

/**
 * @names：普通文本空格过滤
 * @params[str] string
 * @return string
 * */
export const isLocaleEn = () => {
  const locale = getLocale();
  return locale === EnumLanguageType.en;
};

/**
 * ANTD 表格行样式渲染
 * @param record
 * @param index
 * @return string
 */
export const antdTableRowClassName = (record: any, index: number) => {
  if (index % 2) {
    return 'odd';
  }
  // return 'even'
  return '';
};
