import { Action, ActionReducer, createReducer, INIT, on, ReducerManager } from "@ngrx/store";
// import { createIndexedDBRehydrateReducer } from "./rehydration.reducer";

export function empty(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => reducer(state, action);
}

// export function addIndexedDBRehydratedReducer(reducerManager: ReducerManager) {
//   return async () => {
//     const indexedDBRehydrateReducer: any = await createIndexedDBRehydrateReducer({});
//     reducerManager.addReducer(
//       "indexedDBRehydrateReducer",
//       indexedDBRehydrateReducer
//     );
//   }
// }