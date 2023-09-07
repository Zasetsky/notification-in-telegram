import { createStore, Store } from "vuex";
import employees from "./modules/employee";
import notifications from "./modules/notifications";
import bots from "./modules/bots";

import { RootState } from "./storeTypes";

const store: Store<RootState> = createStore({
  modules: {
    employees,
    notifications,
    bots,
  },
});

export default store;
