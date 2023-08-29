import { Module } from "vuex";
import axios from "axios";

const employeesModule: Module<any, any> = {
  namespaced: true,
  state: {
    employees: [],
  },
  mutations: {
    setEmployees(state, employees) {
      state.employees = employees;
    },
  },
  actions: {
    async fetchEmployees({ commit }) {
      try {
        const response = await axios.get("/api/employees");
        commit("setEmployees", response.data);
      } catch (error) {
        console.error("Ошибка при получении данных о сотрудниках:", error);
      }
    },
  },
};

export default employeesModule;
