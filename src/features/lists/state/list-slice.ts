import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  Dictionary,
} from "@reduxjs/toolkit";
import { ICard, IList } from "../../../commons";

const listsAdapter = createEntityAdapter<
  Pick<IList, "id" | "title"> & { cards: string[] }
>();

const initialState: {
  data: ReturnType<typeof listsAdapter.getInitialState>;
  isLoading: boolean;
  error: unknown | string;
} = {
  data: listsAdapter.getInitialState(),
  isLoading: false,
  error: "",
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    loadLists: (state) => {
      state.isLoading = true;
    },
    setLists: (state, action: PayloadAction<any>) => {
      state.data.entities = action.payload.entities.lists;
    },
    listsLoaded: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      if (action.payload.lists) {
        listsAdapter.upsertMany(state.data, action.payload.lists);
      }
    },
    fetchListsFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateListEntityTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const { id, title } = action.payload;
      const oldEntity = state.data.entities[id];

      const newEntity = {
        id,
        title,
        cards: oldEntity?.cards,
      };
      // @ts-ignore
      listsAdapter.setOne(state.data, newEntity);
    },
    addCard: (state, action: PayloadAction<{ id: string; card: ICard }>) => {
      const { id, card } = action.payload;
      const prevList = state.data.entities[action.payload.id];
      prevList?.cards.push(card.id);
    },
    addList: (state, action: PayloadAction<{ title: string; id: string }>) => {
      listsAdapter.addOne(state.data, {
        cards: [],
        id: action.payload.id,
        title: action.payload.title,
      });
    },
    removeList: (state, action: PayloadAction<string>) => {
      listsAdapter.removeOne(state.data, action.payload);
    },
    // @ts-ignore
    moveCard: (
      state,
      action: PayloadAction<{
        fromListId: string;
        cardId: string;
        toListId: string;
      }>
    ) => {
      const { fromListId, cardId, toListId } = action.payload;

      const fromList = state.data.entities[fromListId];
      const toList = state.data.entities[toListId];

      // @ts-ignore
      fromList.cards = fromList?.cards.filter((c) => c != cardId);
      toList?.cards.push(cardId);
    },
  },
});

export const {
  loadLists,
  setLists,
  listsLoaded,
  fetchListsFailed,
  updateListEntityTitle,
  addCard,
  addList,
  removeList,
  moveCard,
} = listSlice.actions;

export { listsAdapter };

export default listSlice;
