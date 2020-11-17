const app = {
  state: {
    isCollapse: false
  },
  getters: {},
  mutations: {
    Collapse(state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {}
};
export default app;
