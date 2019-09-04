module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,    
    devServer: {
        proxy: {           
            '/web': { 
                target: "http://121.204.164.176:8002/web", 
                ws: false,       
                changeOrigin: true,        
                pathRewrite: {        
                '^/web': '/' ,       
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