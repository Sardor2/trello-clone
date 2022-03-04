import { IList } from "@commons/models";
import { listsLoaded, loadLists } from "features/lists/state/list-slice";
import { call, put, takeEvery } from "redux-saga/effects";
import { listService } from "services";

function* loadListsSaga() {
  try {
    const response = yield call(listService.list);
    yield put(listsLoaded(response.data as IList[]));
  } catch (e) {
    console.warn(e);
  }
}

function* listSaga() {
  yield takeEvery(loadLists.type, loadListsSaga);
}

export { listSaga };
