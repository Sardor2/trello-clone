import { configureStore } from "@reduxjs/toolkit";
import listSlice from "features/lists/state/list-slice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "@sagas/root-saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    lists: listSlice.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat([sagaMiddleware])
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store };
