module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,    
    devServer: {
        proxy: {
            '/Api': {        
                target: "http://121.204.164.176:8001/Api",        
                changeOrigin: true,        
                pathRewrite: {        
                '^/Api': '/'        
                } 
            }       
        }        
    },
    // devServer: {
    //     proxy: {
    //         '/Api':{
    //             //target:'http://jsonplaceholder.typicode.com',
    //             target:"http://121.204.164.176:8001/Api",
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '^/Api':'/Api'
    //             }
    //         }
    //     }
    // }
}