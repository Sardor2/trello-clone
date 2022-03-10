import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ICard, IList } from "commons";
import {
  selectAllCards,
  selectCardById,
  selectCardEntities,
} from "features/card";
import {
  listsLoaded,
  loadLists,
  fetchListsFailed,
  updateListEntityTitle,
  addCard,
  addList,
  removeList,
  moveCard,
} from "features/lists/state/list-slice";
import { selectListById } from "features/lists/state/list.selectors";
import { DraggableLocation } from "react-beautiful-dnd";
import { all, call, fork, put, select, takeEvery } from "redux-saga/effects";
import { listService } from "services";

function* loadListsSaga() {
  try {
    const data = yield call(listService.list);
    yield put(listsLoaded(data));
  } catch (e) {
    console.log(e);
    yield put(fetchListsFailed("Failed to load lists!"));
  }
}

function* updateOneList(action: PayloadAction<{ title: string; id: string }>) {
  try {
    const response = yield call(
      // @ts-ignore
      listService.updateOne({
        ...action.payload,
      })
    );
  } catch (error) {}
}

function* addCardToList(action: PayloadAction<{ id: string; card: ICard }>) {
  const { card, id } = action.payload;
  try {
    const list = yield select((state: RootState) => selectListById(state, id));
    const cards = yield select(selectCardEntities);
    const newCards = list.cards.map((cardId) => cards[cardId]);

    const changedList = {
      title: list.title,
      id,
      cards: newCards,
    };

    // @ts-ignore
    yield call(listService.updateOne(changedList));
  } catch (error) {}
}

function* addNewList(action: PayloadAction<{ title: string; id: string }>) {
  const { title, id } = action.payload;
  try {
    const response = yield call(listService.add, { title, id, cards: [] });
  } catch (error) {}
}

function* removeListSaga(action: PayloadAction<string>) {
  try {
    yield call(listService.removeOne, action.payload);
  } catch (error) {}
}

function* moveCardSaga(
  action: PayloadAction<{
    source: DraggableLocation;
    destination: DraggableLocation;
  }>
) {
  try {
    const fromList = yield select((state: RootState) =>
      selectListById(state, action.payload.source.droppableId)
    );
    const toList = yield select((state: RootState) =>
      selectListById(state, action.payload.destination.droppableId)
    );
    const cards = yield select(selectCardEntities);

    const result = yield all([
      fork(
        // @ts-ignore
        listService.updateOne,
        { id: fromList.id, cards: fromList.cards.map((item) => cards[item]) }
      ),
      // @ts-ignore
      fork(listService.updateOne, {
        id: toList.id,
        cards: toList.cards.map((item) => cards[item]),
      }),
    ]);
  } catch (error) {}
}

function* listSaga() {
  yield takeEvery(loadLists.type, loadListsSaga);
  yield takeEvery(updateListEntityTitle.type, updateOneList);
  yield takeEvery(addCard.type, addCardToList);
  yield takeEvery(addList.type, addNewList);
  yield takeEvery(removeList.type, removeListSaga);
  yield takeEvery(moveCard.type, moveCardSaga);
}

export { listSaga };
