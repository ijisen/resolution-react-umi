import { getSessionStorage } from '@/utils/sessionStorage';
import { history } from '@@/core/history';

export const onRedirect = () => {
  const redirect = getSessionStorage('redirect');
  if (redirect) {
    window.location.href = redirect;
  } else {
    history.goBack();
  }
};
