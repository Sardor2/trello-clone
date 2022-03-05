import { all, fork } from "redux-saga/effects";
import { cardSaga } from "./card-saga";
import { listSaga } from "./list-saga";

function* rootSaga() {
  yield all([fork(listSaga), fork(cardSaga)]);
}

export { rootSaga };
