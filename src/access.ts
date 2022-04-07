/**
 * 访问权限控制
 *
 * */
import { EnumUserType, UserInfo } from '@/types/basic.d';

export default function access(initialState: {
  currentUser?: UserInfo | undefined;
}) {
  const { currentUser } = initialState || {};
  // console.log(initialState);
  // console.log(currentUser);
  console.log('-----access---------');
  // console.log(data);
  return {
    canAdmin: currentUser?.userType === EnumUserType.admin,
    canUser: currentUser?.userType !== EnumUserType.admin,
  };
}
