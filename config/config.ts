import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  // 如果需要自行通过 react-helmet 等方式渲染 title，配 title: false 可禁用内置的 title 渲染机制
  // title: false,
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  // favicon: '/assets/favicon.png',
  routes: routes,

  targets: {
    ie: 11,
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  dynamicImport: {

  },
  // 配置 html 的输出形式，默认只输出 index.html。
  // 如果需要预渲染，请开启 ssr 配置，常用来解决没有服务端情况下，页面的 SEO 和首屏渲染提速。
  // 如果开启 exportStatic，则会针对每个路由输出 html 文件。
  exportStatic: {},
});
