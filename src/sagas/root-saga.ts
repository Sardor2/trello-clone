import { all, fork } from "redux-saga/effects";
import { listSaga } from "./list-saga";

function* rootSaga() {
  yield all([fork(listSaga)]);
}

export { rootSaga };
