import Vue from "vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCompositionAPI from "@vue/composition-api";
import App from "./App.vue";
import axios from "axios";
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";
import "./assets/iconfont/icon.css";
import VueAxios from "vue-axios";
import "../src/router/premit";
import global from "@/utils/global.js";
// 城市联动
// import { pcaa } from "area-data-vue";
// import "area-linkage-vue/dist/index.css";
// import AreaLinkageVue from "area-linkage-vue";
// Vue.prototype.$pcaa = pcaa;

// Vue.use(AreaLinkageVue);

Vue.use(global);
// axios.defaults.baseURL = "/devApi";
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
