/**
 * 储存 cookie 值
 */
const setCookie = (
  objName: string,
  objValue: string | {},
  objHours: number,
) => {
  if (!objName || !objValue) {
    return '';
  }
  if (typeof objValue === 'object') {
    objValue = JSON.stringify(objValue);
  }
  // 编码
  if (typeof objValue === 'string') {
    objValue = encodeURI(objValue);
  }
  let str = objName + '=' + objValue;
  // 为0时不设定过期时间，浏览器关闭时cookie自动消失
  if (objHours > 0) {
    const date = new Date();
    const ms = objHours * 3600 * 1000;
    date.setTime(date.getTime() + ms);
    str += '; expires=' + date.toUTCString();
  }
  document.cookie = str;
};

/**
 * 获取 cookie 值
 */
export const getCookieValue = (name: string) => {
  let prefix = name + '=';
  let start = document.cookie.indexOf(prefix);

  if (start === -1) {
    return null;
  }

  let end = document.cookie.indexOf(';', start + prefix.length);
  if (end === -1) {
    end = document.cookie.length;
  }

  let value = document.cookie.substring(start + prefix.length, end);
  value = decodeURI(value);
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};
