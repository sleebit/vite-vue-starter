export default {
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_AUTH_TOKENS(state, payload) {
    state.TOKENS = payload;
  },
  SET_IS_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_TOASTER_DATA(state, payload) {
    state.TOASTER_DATA = payload;
  },
};
