import axios from "axios";

import { PAYMENTS_AUTH_URL } from "@/utils/constants";

export default {
  async register({ commit, dispatch }, payload) {
    try {
      commit("SET_IS_LOADING", true);
      const { data } = await axios.post(
        `${PAYMENTS_AUTH_URL}/auth/register`,
        payload
      );

      commit("SET_AUTH_TOKENS", data.tokens);
      commit("SET_USER", data.user);
    } catch (e) {
      commit("SET_TOASTER_DATA", {
        type: "error",
        message: "Error",
        description: e?.response?.data?.message || e.message,
      });
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async login({ commit, dispatch }, payload) {
    try {
      commit("SET_IS_LOADING", true);
      const { data } = await axios.post(
        `${PAYMENTS_AUTH_URL}/auth/login`,
        payload
      );

      commit("SET_AUTH_TOKENS", data.tokens);
      commit("SET_USER", data.user);
    } catch (e) {
      commit("SET_TOASTER_DATA", {
        type: "error",
        message: "Error",
        description: e?.response?.data?.message || e.message,
      });
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async loginViaGoogle({ commit, dispatch }, payload) {
    try {
      commit("SET_IS_LOADING", true);
      const { data } = await axios.post(
        `${PAYMENTS_AUTH_URL}/auth/login-via-google`,
        payload
      );

      commit("SET_AUTH_TOKENS", data.tokens);
      commit("SET_USER", data.user);
    } catch (e) {
      console.log(e);
      commit("SET_TOASTER_DATA", {
        type: "error",
        message: "Error",
        description: e?.response?.data?.message || e.message,
      });
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async logout({ commit, dispatch }, payload) {
    try {
      commit("SET_IS_LOADING", true);
      await axios.post(`${PAYMENTS_AUTH_URL}/auth/logout`, payload);
    } catch (e) {
      console.log(e);
    } finally {
      commit("SET_IS_LOADING", false);
      commit("SET_AUTH_TOKENS", null);
      commit("SET_USER", null);
    }
  },

  showNotification({ commit }, payload) {
    commit("SET_TOASTER_DATA", payload);
  },
};
