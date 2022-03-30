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

export default [...menuData];
