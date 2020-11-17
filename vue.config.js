const path = require("path");

module.exports = {
  publicPath: "./", // 基本路径
  outputDir: "dist", // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查

  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack配置
  chainWebpack: (config) => {
    config.resolve.symlinks(true);
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".json", ".vue"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@components": path.resolve(__dirname, "./src/components"),
          "@common": path.resolve(__dirname, "./src/common"),
          "@api": path.resolve(__dirname, "./src/api"),
          "@router": path.resolve(__dirname, "./src/router"),
          "@views": path.resolve(__dirname, "./src/views"),
          "@data": path.resolve(__dirname, "./src/data"),
          "@public": path.resolve(__dirname, "public"),
          "@utils": path.resolve(__dirname, "./src/utils")
        } // 别名配置
      }
    });
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      sass: {
        prependData: `@import  "./src/styles/main.scss";`
      },
      // 这里的选项会传递给 css-loader
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px", // 需要转换的单位，默认为"px"
            viewportWidth: 1920, // 视窗的宽度，对应pc设计稿的宽度，一般是1920
            // viewportHeight: 1080,// 视窗的高度，对应的是我们设计稿的高度
            unitPrecision: 3, // 单位转换后保留的精度
            propList: [
              // 能转化为vw的属性列表
              "*"
            ],
            viewportUnit: "vw", // 希望使用的视口单位
            fontViewportUnit: "vw", // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/ // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          })
        ]
      } // 这里的选项会传递给 postcss-loader
    }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0", // 允许外部ip访问
    port: 8022, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    proxy: {
      "/devApi": {
        // target: "http://mall-pre.springboot.cn/",
        target: "http://www.web-jshtml.cn/vue_admin_api/token",
        // target: "http://www.web-jshtml.cn/vue_admin_api/",
        changeOrigin: true, // 允许websockets跨域
        // ws: true,
        pathRewrite: {
          "^/devApi": ""
        }
      }
    } // 代理转发配置，用于调试环境
  },
  // 第三方插件配置
  pluginOptions: {}
};
