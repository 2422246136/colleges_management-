const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const isProduction = process.env.NODE_ENV === 'production';
const cdn = {
    js: isProduction ? [
        {name: 'vue', src: 'https://cdn.staticfile.org/vue/2.6.10/vue.min.js'},
        {name: 'vue-router', src: 'https://cdn.staticfile.org/vue-router/3.0.6/vue-router.min.js'},
        {name: 'view-design', src: 'https://unpkg.com/view-design@4.0.2/dist/iview.min.js'},
        {name: 'vuex', src: 'https://cdn.staticfile.org/vuex/3.1.1/vuex.min.js'},
        {name: 'moment', src: 'https://cdn.staticfile.org/moment.js/2.24.0/moment.min.js'},
        {name: 'axios', src: 'https://cdn.staticfile.org/axios/0.19.0/axios.min.js'},
        {name: 'back', src: '/colleges_management/static/resourcesConfig.js'},     //backUp config
    ] : [],
    css: [
        {name: 'icon', src: 'https://at.alicdn.com/t/font_1460625_k22i8i1sr29.css'},
        {name: 'view-design', src: 'https://unpkg.com/view-design@4.0.2/dist/styles/iview.css'},
    ]
};

module.exports = {
    // 基本路径
    publicPath: '/collegesManagement',
    // 输出文件目录
    outputDir: 'collegesManagement',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('images', resolve('src/assets/images'));
        config.when(process.title.indexOf('report') > 0, config => {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
        });
        config.plugin('html')
            .tap(args => {
                args[0].cdn = cdn;
                return args;
            });
        // 配置 externals 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
        config.when(process.env.NODE_ENV === 'production', config => {
            config
                .externals({
                    'vue': 'Vue',
                    'vue-router': 'VueRouter',
                    'vuex': 'Vuex',
                    // 'echarts': 'echarts',
                    // 'swiper': 'Swiper',
                    // '@antv/g2': 'G2',
                    'view-design': 'iview',
                    // "vue-cookies": '$cookies',
                    'axios': 'axios',
                })
        })
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // webpack-dev-server 相关配置
    devServer: {
        proxy: {
            '/colleges_management/': {
                target: 'http://127.0.0.1:9999/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/colleges_management/': '/'
                }
            },
        },
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
};
