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
    }
  }