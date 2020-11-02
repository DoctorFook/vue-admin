import http from "./http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
// let resquest = "/devApi";
// 获取验证码url
// let request = 'http://www.web-jshtml.cn/api'
// let request = 'http://www.web-jshtml.cn/productapi'
// let getSms = `/devApi/forshop/wxshop`;
// let getSms = `https://meituan.thexxdd.cn/api/forshop/wxshop`;
let getSms = `/getSms/`;
// let getSms = `/devApi/getSms/`;
// let getSms = "http://mall-pre.springboot.cn/products";
let register = `/register/`
let login = `/login/`
// get请求
export function getListAPI(url, params) {
  return http.get(url, params);
}
// post请求
export function postFormAPI(url, params) {
  return http.post(url, params);
}
// put 请求
export function putSomeAPI(url, params) {
  return http.put(url, params);
}
// delete 请求
export function deleteListAPI(url, params) {
  return http.delete(url, params);
}

export { getSms ,register,login};
