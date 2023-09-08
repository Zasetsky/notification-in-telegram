import { Module } from "vuex";
import { GlobalPropsState } from "./globalPropsTypes";
import { RootState } from "../storeTypes";

const globalProps: Module<GlobalPropsState, RootState> = {
  namespaced: true,
  state: {
    accountId: null,
    appName: null,
  },

  mutations: {
    setGlobalProps(state, payload: GlobalPropsState) {
      state.accountId = payload.accountId;
      state.appName = payload.appName;
    },
  },

  getters: {
    getAccountId: (state) => state.accountId,
    getAppName: (state) => state.appName,
  },
};

export default globalProps;
