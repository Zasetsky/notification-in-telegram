import { createStore, Store } from "vuex";
import employees from "./modules/employee";
import buttons from "./modules/buttons";

import { RootState } from "./storeTypes";

const store: Store<RootState> = createStore({
  modules: {
    employees,
    buttons,
  },
});

export default store;
