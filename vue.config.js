module.exports = {
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
            '/document': {
                target: 'http://192.168.1.134/crm',
                // target: 'http://127.0.0.1:4523/mock/466637',
                changeOrigin: true,
                pathRewrite: {
                    '^/document': ''
                }
            }
        }
    }
  }