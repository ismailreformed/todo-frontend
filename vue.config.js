module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:80/api', // Replace with your API's domain
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // Remove the '/api' prefix from requests
        }
      }
    }
  }
};
