module.exports = {
  runtimeCompiler: true,
    publicPath: './',
    css: {

        loaderOptions: {
            less: {
               // javascriptEnabled: true // old solution
               // HERE is the difference!
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    },
    devServer: {
		// open: true,
		// // disableHostCheck: false,
		// host: "localhost",
		// port: 8081,
		// https: false,
        proxy:{
            '/userToken': {
                target: 'http://192.168.1.41',
                changeOrigin: true,
                pathRewrite: {
                    '^/userToken': ''
                }
            },
            '/apis': {
                target: 'http://localhost:5000/',
                // target: 'http://192.168.1.70:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': ''
                }
            }
        }
    }
  }