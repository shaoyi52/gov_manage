let URL = "http://120.76.247.196:8041/web";
let FileUrl='http://120.76.247.196:8041/Api'
let FileRootROOT;
let FileRoot;
//console.log('NODE_ENV',process.env.NODE_ENV)
//由于封装的axios请求中，会将ROOT打包进去，为了方便之后不再更改，判断了当前环境，而生成的不同的ROOT
if (process.env.NODE_ENV === "development") {
  //开发环境下的代理地址，解决本地跨域跨域，配置在vue.config.js里
  ROOT = "/web";
  FileRoot='/Api';
} else {
  //生产环境下的地址
  ROOT = URL;
  FileRoot=FileUrl;
}
// export default { ROOT, URL };
exports.URL = URL; //代理指向地址
exports.ROOT = ROOT;

exports.FileUrl = FileUrl; //代理指向地址
exports.FileRoot = FileRoot;