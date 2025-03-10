import actions from "./actions.js";
import mutations from "./mutations.js";

export default {
  namespaced: true,
  state: {
    user: null,
    TOKENS: null,
    TOASTER_DATA: null,
    isLoading: false,
  },
  getters: {},
  mutations,
  actions,
};
