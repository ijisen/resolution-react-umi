/**
 * 端口号校验
 * */
import isInRange from '../isInRange';

export default (str: any) => {
  return isInRange(str, 1, 65535);
};
