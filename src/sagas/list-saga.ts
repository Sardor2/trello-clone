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
  moveList,
} from "features/lists/state/list-slice";
import {
  selectAllLists,
  selectListById,
  selectListEntities,
  selectListIds,
} from "features/lists/state/list.selectors";
import { DraggableLocation } from "react-beautiful-dnd";
import {
  all,
  call,
  delay,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
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
  yield delay(500);
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
      id,
      cards: newCards,
    };

    // @ts-ignore
    yield call(listService.updateOne(changedList));
  } catch (error) {}
}

function* addNewList(
  action: PayloadAction<{ title: string; id: string; order: number }>
) {
  const { title, id, order } = action.payload;
  try {
    const response = yield call(listService.add, {
      title,
      id,
      cards: [],
      order,
    });
  } catch (error) {}
}

function* removeListSaga(action: PayloadAction<string>) {
  try {
    const lists = yield select(selectAllLists)
    yield call(listService.removeOne, lists, action.payload);
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
    // @ts-ignore
    yield call(listService.updateLists,[
      {
        id: fromList.id,
        cards: fromList.cards.map((item) => cards[item])
      },
      {
        id: toList.id,
        cards: toList.cards.map((item) => cards[item]),
      }
    ])
  } catch (error) {}
}

function* moveListSaga() {
  const listEntitties = yield select(selectListEntities);
  const listIds = yield select(selectListIds);
  const cardEntities = yield select(selectCardEntities);

  yield call(
    listService.updateLists,
    listIds.map((item) => {
      const list = listEntitties[item];
      let cards = list.cards.map((cardId) => cardEntities[cardId]);
      return {
        ...list,
        cards,
      };
    })
  );
}

function* listSaga() {
  yield takeEvery(loadLists.type, loadListsSaga);
  yield takeLatest(updateListEntityTitle.type, updateOneList);
  yield takeEvery(addCard.type, addCardToList);
  yield takeEvery(addList.type, addNewList);
  yield takeEvery(removeList.type, removeListSaga);
  yield takeEvery(moveCard.type, moveCardSaga);
  yield takeEvery(moveList.type, moveListSaga);
}

export { listSaga };
