const notFound = './Exception/404';
const PageLayout = '@/layouts/PageLayout';

export const menuData = [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/analysis',
      },
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        icon: 'smile',
        component: './Demo',
      },
      {
        path: '/dashboard/monitor',
        name: 'monitor',
        icon: 'smile',
        component: './Demo',
      },
      {
        path: '/dashboard/workplace',
        name: 'workplace',
        layout: false,
        icon: 'smile',
        component: './Demo',
      },
    ],
  },
  {
    path: '/demo',
    name: 'demo',
    component: './Demo',
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    access: 'canAdmin',
    component: PageLayout,
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub',
      },
      {
        path: '/admin/sub',
        name: 'sub',
        access: 'canAdmin',
        component: './Demo',
      },
    ],
  },
  {
    path: '/member',
    name: 'user',
    access: 'canUser',
    component: './User',
    routes: [
      {
        path: '/member/',
        redirect: '/member/sub',
      },
      {
        path: '/member/sub',
        name: 'sub',
        access: 'canUser',
        component: './Demo',
      },
    ],
  },
  { component: notFound },
];

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        // layout: false,
        name: 'login',
        component: './Login',
      },
      {
        path: '/user/register-result',
        name: 'register-result',
        icon: 'smile',
        component: './Login',
      },
      {
        path: '/user/register',
        name: 'register',
        icon: 'smile',
        component: './Login',
      },
      {
        component: notFound,
      },
    ],
  },
  ...menuData,
];
