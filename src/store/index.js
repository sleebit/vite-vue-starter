import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import auth from "./modules/auth";

export default createStore({
  modules: {
    auth,
  },
  state: () => ({}),
  actions,
  mutations,
});
