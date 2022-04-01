import { useIntl } from 'umi';

export const setLanguage = (keys: string) => {
  const intl = useIntl();
  return intl.formatMessage({
    id: keys,
    defaultMessage: '-',
  });
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
