import { RouteRecordRaw } from 'vue-router';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';

type Menu = {
  text: string;
  icon?: any;
  path?: string;
  key: string;
  child?: Menu[];
};

const routers: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '/index',
        name: 'devAccount',
        component: () => import('@/views/account-management/dev/index.vue'),
      },
      {
        path: '/testAccount',
        name: 'testAccount',
        component: () => import('@/views/account-management/test/index.vue'),
      },
      {
        path: '/devException',
        name: 'devException',
        component: () =>
          import('@/views/abnormal-monitor/dev-exception/index.vue'),
      },
      {
        path: '/newMapping',
        name: 'newMapping',
        component: () =>
          import('@/views/abnormal-monitor/new-mapping/index.vue'),
      },
    ],
  },
];

const leftMenu: Menu[] = [
  {
    text: '账号管理',
    icon: AppstoreOutlined,
    key: 'sub1',
    child: [
      {
        text: '开发账号',
        path: '/index',
        key: 'index',
      },
      {
        text: '测试账号',
        path: '/testAccount',
        key: 'testAccount',
      },
    ],
  },
  {
    text: '异常监控',
    icon: SettingOutlined,
    key: 'sub2',
    child: [
      {
        text: '开发异常',
        path: '/devException',
        key: 'devException',
      },
      {
        text: '新增映射值',
        path: '/newMapping',
        key: 'newMapping',
      },
    ],
  },
];

export { routers, leftMenu };
