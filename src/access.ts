/**
 * 访问权限控制
 *
 * */

export default function access(initialState: {
  currentUser?: API.UserInfo | undefined;
}) {
  const { currentUser } = initialState || {};
  // console.log(initialState);
  console.log(currentUser);
  console.log('-----access---------');
  const data = {
    canAdmin: currentUser?.userType === '2',
    canUser: currentUser?.userType === '1',
  };
  // console.log(data);
  return data;
}
