import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ICard } from "commons";
import {
  addCard,
  listsLoaded,
  loadLists,
} from "features/lists/state/list-slice";

const cardsAdapter = createEntityAdapter<ICard>();

const cardSlice = createSlice({
  name: "card",
  initialState: cardsAdapter.getInitialState(),
  reducers: {
    updateCard: (
      state,
      action: PayloadAction<{ card: ICard; listId: string }>
    ) => {
      const { card } = action.payload;
      cardsAdapter.updateOne(state, {
        changes: card,
        id: card.id,
      });
    },
  },
  extraReducers: {
    [listsLoaded.type]: (state, action) => {
      if (action.payload.cards) {
        cardsAdapter.addMany(state, action.payload.cards);
      }
    },
    [addCard.type]: (state, action: PayloadAction<{ card: ICard }>) => {
      cardsAdapter.addOne(state, action.payload.card);
    },
  },
});

export const { updateCard } = cardSlice.actions;

export const {
  selectAll: selectAllCards,
  selectById: selectCardById,
  selectEntities: selectCardEntities,
  selectIds: selectCardIds,
  selectTotal: selectCardsTotalNumber,
} = cardsAdapter.getSelectors((state: RootState) => state.cards);

export default cardSlice;