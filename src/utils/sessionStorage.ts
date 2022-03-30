/**
 * 存储sessionStorage
 */
export const setSessionStorage = (key: string, data: any) => {
  if (!key) return false;
  if (typeof data !== 'string') {
    data = JSON.stringify(data);
  }
  window.sessionStorage.setItem(key, data);
};

/**
 * 获取sessionStorage
 */
export const getSessionStorage = (key: string) => {
  if (!key) return false;
  const value = window.sessionStorage.getItem(key) || '';
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
  // return value ? JSON.parse(value) : value
};

/**
 * 删除sessionStorage
 */
export const removeSessionStorage = (key: string) => {
  if (!key) return false;
  window.sessionStorage.removeItem(key);
};
