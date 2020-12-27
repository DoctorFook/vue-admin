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
let register = `/register/`;
let login = `/login/`;
let getList = `/news/getList/`;
// 添加一级接口
let addFirstCategory = `/news/addFirstCategory/`;
// 添加子级接口
let addChildrenCategory = `/news/addChildrenCategory/`;
// 请求有二级分类的接口
let getCategory = `/news/getCategoryAll/`;
// 删除分类
let deleteCategory = `/news/deleteCategory/`;
// 修改分类
let editCategory = `/news/editCategory/`;
// 新增信息
let addInfo = `/news/add/`;
// 删除信息
let deleteInfo = `/news/deleteInfo/`;
// 编辑信息
let editInfo = `/news/editInfo/`;
// 添加子级
let addChild = `/news/addChildrenCategory/`;
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

export {
  getSms,
  register,
  login,
  getList,
  addFirstCategory,
  getCategory,
  addChildrenCategory,
  deleteCategory,
  editCategory,
  addInfo,
  deleteInfo,
  editInfo,
  addChild
};
