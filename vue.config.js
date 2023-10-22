const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 自定义更改端口号
  devServer: {
    host: '0.0.0.0',  // host:0.0.0.0 表示将 webpack dev server 绑定到所有可用的网络接口上，而不仅仅是默认的 localhost
    port: 2136,
    // public: 'https://1945-58-58-234-222.ngrok-free.app.ngrok.io',
    // headers: {
    //   'Access-Control-Allow-Origin': '*'
    // }
  },
})


