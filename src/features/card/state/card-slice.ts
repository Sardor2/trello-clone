import { MailRounded } from "@mui/icons-material";
import {
  createAction,
  createEntityAdapter,
  createReducer,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ICard, IList } from "commons";
import {
  addCard,
  listsLoaded,
  loadLists,
  moveCard,
  updateLists,
  updateSingleList,
} from "features/lists/state/list-slice";

const cardsAdapter = createEntityAdapter<ICard>({});

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
    [updateLists.type]: (state, action: PayloadAction<any>) => {
      if (action.payload.cards) {
        cardsAdapter.setMany(state, action.payload.cards);
      }
    },
    [updateSingleList.type]: (state, action: PayloadAction<IList>) => {
      cardsAdapter.upsertMany(state, action.payload.cards);
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
