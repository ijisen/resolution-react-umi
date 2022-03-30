import { defineConfig } from 'umi';
import routes from './routes';
import CompressionWebpackPlugin from 'compression-webpack-plugin';

export default defineConfig({
  // 如果需要自行通过 react-helmet 等方式渲染 title，配 title: false 可禁用内置的 title 渲染机制
  // title: false,
  hash: true,
  // 项目部署路径
  // base: '',
  // 静态资源存放路径
  // publicPath: '',
  nodeModulesTransform: {
    type: 'none',
  },
  // favicon: '/assets/favicon.png',
  routes: routes,
  layout: {
    // title: 'page.title',
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    // name: 'Ant Design2',
    locale: true,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    // default: 'en-US',
    // antd 插件国际化
    antd: true,
    // 在项目中配置的 title 及路由中的 title 可直接使用国际化 key，自动被转成对应语言的文案，
    // 路由title page.title
    title: true,
    // 开启浏览器语言检测。
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
  },
  targets: {
    ie: 11,
  },
  // 忽略 moment 的 locale 文件，用于减少尺寸。
  ignoreMomentLocale: true,
  // Fast Refresh 热更新
  fastRefresh: {},
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  // 配置 html 的输出形式，默认只输出 index.html。
  // 如果需要预渲染，请开启 ssr 配置，常用来解决没有服务端情况下，页面的 SEO 和首屏渲染提速。
  // 如果开启 exportStatic，则会针对每个路由输出 html 文件。
  exportStatic: {},
  // webpack5: {},
  // 开启该功能将会自动开启 webpack5 和 dynamicImport.
  // mfsu: {},
  /*chainWebpack(config, { env, webpack }) {
    // webpack 拆包
    config.optimization.splitChunks({
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      enforceSizeThreshold: 50000,
      automaticNameDelimiter: '_',
      // name: true,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    });
    /!*config.optimization // share the same chunks across different modules
      .splitChunks({
        cacheGroups: {
          vendors: {
            name: 'vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|lodash|lodash-decorators|dva|moment)[\\/]/,
            priority: -9,
          },
          design: {
            name: 'design',
            // all chunks包括异步和非异步
            // async chunks异步
            // initial chunks非异步
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@ant-design)[\\/]/,
            priority: -10
          },
          antd: {
            name: 'antd',
            // all chunks包括异步和非异步
            // async chunks异步
            // initial chunks非异步
            chunks: 'all',
            test: /[\\/]node_modules[\\/](antd)[\\/]/,
            priority: -11
          },
        }
      });*!/
    /!*config.plugin('replace').use(require('webpack').ContextReplacementPlugin).tap(() => {
      return [/moment[\/\\]locale$/, /en|zh-cn/];
    });*!/
    if (env === 'production') {
      config.plugin('compression-webpack-plugin').use(
        new CompressionWebpackPlugin({
          // filename: 文件名称，这里我们不设置，让它保持和未压缩的文件同一个名称
          algorithm: 'gzip', // 指定生成gzip格式
          test: new RegExp('\\.(js|css)$'), // 压缩 js 与 css
          threshold: 10240, //对超过10k的数据进行压缩
          minRatio: 0.8, // 压缩比例，值为0 ~ 1
        }),
      );
    }
  },*/
  // chunks: ['reacts', 'antdesigns', 'vendors', 'umi'], // 需要包含 cacheGroups 的包
});
