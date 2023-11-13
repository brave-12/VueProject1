module.exports = {
  // 打包的时候不打包 map 文件(map文件是为了找错误的)
  productionSourceMap:false,
  // 关闭eslint
  lintOnSave:false,
  // 代理服务器配置
  devServer: {
    proxy: {
     '/api': {
        target: 'http://gmall-h5-api.atguigu.cn', // 目标路径，别忘了加http和端口号
        // changeOrigin: true, // 是否跨域
      },
    },
  },
  

}
