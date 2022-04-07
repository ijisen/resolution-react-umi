const notFound = './Exception/404';
const PageLayout = '@/layouts/PageContainer';

export const menuData = [
  {
    path: '/',
    redirect: '/dns',
  },
  {
    path: '/dns',
    name: 'dns',
    // component: PageLayout,
    routes: [
      {
        path: '/dns',
        redirect: '/dns/setting',
      },
      {
        path: '/dns/setting',
        name: 'setting',
        component: './DNS/Settings',
      },
      { component: notFound },
    ],
  },
  { component: notFound },
];

export default [
  {
    path: '/user',
    name: 'user',
    hideInMenu: true,
    menuRender: false,
    // component: PageLayout,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: './User/Login',
      },
      { component: notFound },
    ],
  },
  ...menuData,
];
