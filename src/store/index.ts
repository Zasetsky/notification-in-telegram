import { createStore, Store } from "vuex";
import employees from "./modules/employee";

import { RootState } from "@/types";

const store: Store<RootState> = createStore({
  modules: {
    employees,
  },
});

export default store;
