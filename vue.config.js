module.exports = {
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      '/auth':{
        target: 'http://localhost:9999',
        changeOrigin: true
      },
      '/api':{
        target: 'http://localhost:9999',
        changeOrigin: true
      }
    }
  },

}