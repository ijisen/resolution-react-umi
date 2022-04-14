// is zone
import isDomain from './isDomain';

const isZone = (str: string, lang?: string) => {
  const rootZone = '.';
  if (rootZone === str) {
    return true;
  }
  const { success } = isDomain(str, lang);
  return success;
};

export default isZone;
