import { createStore, Store } from "vuex";
import employees from "./modules/employee";
import notifications from "./modules/notifications";
import bots from "./modules/bots";
import globalProps from "./modules/globalProps";

import { RootState } from "./storeTypes";
import { GlobalPropsState } from "./modules/globalPropsTypes";

export function initializeStore(
  initialProps: GlobalPropsState
): Store<RootState> {
  const store: Store<RootState> = createStore({
    modules: {
      employees,
      notifications,
      bots,
      globalProps,
    },
  });

  store.commit("globalProps/setGlobalProps", initialProps);
  return store;
}
