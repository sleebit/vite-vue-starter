import axios from "axios";

import { BACKEND_URL, PAYMENTS_AUTH_URL } from "@/utils/constants";

export default {
  // Create an Agent
  async createAgent({ state, commit }, agentData) {
    try {
      const response = await axios.post(`${BACKEND_URL}/agent`, agentData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.JWT_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      // You can add additional error handling here
      throw error;
    }
  },

  // Edit an Agent
  async editAgent({ state, commit }, { agentId, data }) {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/agent/${agentId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.JWT_TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete an Agent
  async deleteAgent({ state, commit }, payload) {
    const { agentId } = payload;
    try {
      const response = await axios.delete(`${BACKEND_URL}/agent/${agentId}`, {
        headers: {
          Authorization: `Bearer ${state.JWT_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get Pricing Information
  async getPricing({ state, commit }) {
    const params = {
      asr: "nova-2",
      llm_model: "gpt-4o-mini",
      tts_provider: "elevenlabs",
      tts_model: "eleven_turbo_v2_5",
    };
    try {
      const response = await axios.get(`${BACKEND_URL}/get_current_price`, {
        headers: {
          Authorization: `Bearer ${state.JWT_TOKEN}`,
        },
        params,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
