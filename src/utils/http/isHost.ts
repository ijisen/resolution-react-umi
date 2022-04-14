// is host
import isDomain from '@/utils/http/isDomain';

const isHost = (str: string, lang?: string) => {
  const specialHosts = '@';
  if (str.indexOf(specialHosts) > -1) {
    return true;
  }
  const { success } = isDomain(str, lang);
  return success;
};

export default isHost;
