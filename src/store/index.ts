import { createStore } from "vuex";
import employees from "./modules/employee";

export default createStore({
  modules: { employees },
});
