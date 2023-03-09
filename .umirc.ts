import React from 'react';
import { defineConfig } from 'umi';
export default defineConfig({
  title: '测试工具平台',
  favicon:
    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: '测试工具平台',
    locale: false,
  },
  routes: [
    // { path: '/', component: '@/pages/index' },
    { path: '/', component: '@/pages/Dashboard/Tokenboard' },
    {
      path: '/dashboard',
      name: '工具',
      icon: 'tool',
      component: '@/pages/Dashboard/Tokenboard',
    },
  ],
  fastRefresh: {},
});
