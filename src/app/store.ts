import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "features/card/state/card-slice";
import authSlice from "features/lists/state/auth-slice";
import listSlice from "features/lists/state/list-slice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "sagas/root-saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    lists: listSlice.reducer,
    cards: cardSlice.reducer,
    auth: authSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat([sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
