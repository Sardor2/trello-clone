import { RootState } from "app/store";
import { ICard } from "commons";
import { selectCardEntities, updateCard } from "features/card";
import { selectListById } from "features/lists/state/list.selectors";
import { all, call, fork, select, takeEvery } from "redux-saga/effects";
import { cardService } from "services";

function* updateCardSaga(action: { payload: { card: ICard; listId: string } }) {
  const list = yield select((state: RootState) =>
    selectListById(state, action.payload.listId)
  );
  const cards = yield select(selectCardEntities);
  const newCards = list.cards.map((cardId) => cards[cardId]);
  yield call(cardService.updateCard(action.payload.listId), newCards);
}

export function* cardSaga() {
  // @ts-expect-error
  yield takeEvery(updateCard.type, updateCardSaga);
}
