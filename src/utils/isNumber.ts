import { filterStringSpace } from './base/filterStringSpace';

/**
 * 判断参数是否为数字
 *
 * @param[number] 价格参数
 * @param[allowNegative] 是否允许为负数
 */
export default (number: any, allowNegative = false) => {
  /**
   * isNaN([]) || isNaN('') || isNaN(true) || isNaN(false) || isNaN(null) => false
   * */
  if (typeof number === 'string') {
    number = filterStringSpace(number);
  }
  if (
    isNaN(number) ||
    number === '' ||
    typeof number === 'object' ||
    typeof number === 'boolean'
  ) {
    return false;
  } else {
    number = parseFloat(number);
    if (number < 0) {
      return allowNegative;
    } else {
      return true;
    }
  }
};
