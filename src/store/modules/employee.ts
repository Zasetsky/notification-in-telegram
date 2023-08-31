import { Module } from "vuex";
import axios from "axios";
import { EmployeesState, Employee, SelectedEmployee, RootState } from "@/types";

const employees: Module<EmployeesState, RootState> = {
  namespaced: true,
  state: {
    employees: [],
    selectedEmployees: [],
  },

  getters: {
    getEmployees: (state) => state.employees,

    getSelectedEmployees: (state) => state.selectedEmployees,
  },

  mutations: {
    setEmployees(state, employees: Employee[]) {
      state.employees = employees;
    },

    setSelectedEmployees(state, employees: SelectedEmployee[]) {
      state.selectedEmployees = employees;
    },

    deleteSelectedEmployee(state, id) {
      state.selectedEmployees = state.selectedEmployees.filter(
        (employee) => employee.id !== id
      );
    },
  },

  actions: {
    async fetchEmployees({ commit }) {
      try {
        const response = await axios.get<Employee[]>(
          "http://localhost:3000/get-employees"
        );

        commit("setEmployees", response.data);
      } catch (error) {
        console.error("Ошибка при получении данных о сотрудниках:", error);
      }
    },

    async fetchSelectedEmployees({ commit }) {
      try {
        const response = await axios.get<SelectedEmployee[]>(
          "http://localhost:3000/get-selected-employees"
        );

        commit("setSelectedEmployees", response.data);
      } catch (error) {
        console.error("Ошибка при получении данных о сотрудниках:", error);
      }
    },
  },
};

export default employees;
