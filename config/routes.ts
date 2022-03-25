const notFound = './Exception/404';
export const routes = [
  {
    path: '/demo',
    title: 'Demo',
    component: '@/pages/Demo',
    wrappers: [
      '@/component/auth',
    ],
  },
  {
    path: '/welcome',
    title: 'Welcome',
    component: '@/pages/Welcome',
  },
];
export default [
  {
    path: '/login',
    // exact 表示是否严格匹配，即 location 是否和 path 完全对应上。
    exact: true,
    component: '@/pages/Login',
  },
  {
    path: '/',
    title: '首页',
    component: '@/pages/index',
    routes: [
      ...routes,
      { component: notFound },
    ],
  },
  { component: notFound },
];
