import {
  setToken,
  setUserName,
  removeToken,
  removeUserName
} from "../../utils/saveToken";
export default {
  namespaced: true,
  state: {
    toKen: "",
    userName: ""
  },
  getters: {},
  mutations: {
    showToken(state, data) {
      state.toKen = data.token;
      state.userName = data.username;
      setToken(state.toKen);
      setUserName(state.userName);
    },
    logout(state) {
      removeToken(state.token);
      removeUserName(state.userName);
    }
  },
  actions: {}
};
