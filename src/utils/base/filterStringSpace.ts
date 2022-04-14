/**
 * @names：普通文本过滤所有的空格
 * @params[str] string
 * @return string
 * */
export const filterStringSpace = (str: string) => {
  return str.replace(/\s+/g, '');
};
