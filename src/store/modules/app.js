import { postFormAPI, getCategory } from "../../api/api";
const app = {
  namespaced: true,
  state: {
    isCollapse: false,
    category: [],
    editRow: {},
    detail: [],
    userList:[],
    userId:[]
  },
  getters: {},
  mutations: {
    Collapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 获取分类列表
    getCategoryAll(state) {
      postFormAPI(getCategory)
        .then((res) => {
          // console.log(res.data.data);
          state.category = res.data.data;
          // console.log(state.category);
          sessionStorage.setItem("category", JSON.stringify(state.category));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendRow(state, row) {
      state.editRow = row;
    },
    getInfoDetail(state, row) {
      state.detail = row;
      sessionStorage.setItem("detail", JSON.stringify(state.detail));
    },
    getUserList(state,row){
      state.userList = row
      console.log(state.userList);
    },
    getUserId(state,row){
      state.userId = row
      console.log(state.userId);
    }
  },
  actions: {}
};
export default app;
