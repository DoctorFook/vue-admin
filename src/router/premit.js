import router from "./index";
import store from '../store/index'
import { getToken, removeToken, removeUserName } from "../utils/saveToken";
// 白名单
const whiteRouter = ["/login"];
// 路由守卫
router.beforeEach((to, from, next) => {
  // 如果有token
  if (getToken()) {
    if (to.path === "/login") {
      // location.reload();
      // removeToken();
      // removeUserName();
      store.commit("login/logout")
      next();
    } else {
      next();
      console.log("存在");
    }

    // 没token
  } else {
    //   判断白名单里面是否存在输入的path,如果不存在就返回-1
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      console.log("不存在");
      next("/login"); //路由指向
    }
  }
});
