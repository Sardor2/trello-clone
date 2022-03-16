import { Source } from "@mui/icons-material";
import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  Dictionary,
  EntityId,
  EntityAdapter,
} from "@reduxjs/toolkit";
import { DraggableLocation } from "react-beautiful-dnd";
import { ICard, IList } from "../../../commons";

const listsAdapter = createEntityAdapter<
  Pick<IList, "id" | "title" | "order"> & { cards: string[] }
>({
  sortComparer: (a,b) => a.order - b.order
});

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
    updateLists: (state, action: PayloadAction<any>) => {
      if (action.payload.lists) {
        listsAdapter.upsertMany(state.data, action.payload.lists)
      }
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
      action: PayloadAction<{ id: EntityId; title: string }>
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
    addList: (
      state,
      action: PayloadAction<{ title: string; id: string; order: number }>
    ) => {
      listsAdapter.addOne(state.data, {
        cards: [],
        id: action.payload.id,
        title: action.payload.title,
        order: action.payload.order,
      });
    },
    removeList: (state, action: PayloadAction<EntityId>) => {
      const index = state.data.ids.indexOf(action.payload)
      const lists = state.data.ids.map(id => state.data.entities[id])

      lists.slice(index + 1, lists.length).forEach(item => {
        if (item?.order) {
          item.order -= 1
        }
      })

      listsAdapter.removeOne(state.data, action.payload);
      
    },
    // @ts-ignore
    moveCard: (
      state,
      action: PayloadAction<{
        source: DraggableLocation;
        destination: DraggableLocation;
      }>
    ) => {
      const { source, destination } = action.payload;

      if (source.droppableId !== destination.droppableId) {
        const fromList = state.data.entities[source.droppableId];
        const toList = state.data.entities[destination.droppableId];

        if (!fromList?.cards || !toList?.cards) return;

        const sourceCards = [...fromList.cards];
        const destCards = [...toList.cards];

        const [removedCard] = sourceCards.splice(source.index, 1);
        destCards.splice(destination.index, 0, removedCard);

        fromList.cards = sourceCards;
        toList.cards = destCards;
      } else {
        const list = state.data.entities[source.droppableId];
        if (!list?.cards) return;
        const copiedItems = [...list.cards];
        const [removedCard] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removedCard);
        list.cards = copiedItems;
      }
    },
    moveList(
      state,
      action: PayloadAction<{
        source: DraggableLocation;
        destination: DraggableLocation;
      }>
    ) {
      const { source, destination } = action.payload;
      const listIds = state.data.ids;
      const entities = state.data.entities;

      const sourceId = listIds[source.index];
      const destId = listIds[destination.index];

      const sourceList = entities[sourceId];
      const destList = entities[destId];

      if (sourceList && destList) {
        let temp = sourceList.order;
        sourceList.order = destList.order;
        destList.order = temp;
      }

      // let fromOrder = state.data.entities[source.index]?.order;

      const [removedList] = listIds.splice(source.index, 1);
      listIds.splice(destination.index, 0, removedList);
    },
  },
});

export const {
  loadLists,
  updateLists,
  listsLoaded,
  fetchListsFailed,
  updateListEntityTitle,
  addCard,
  addList,
  removeList,
  moveCard,
  moveList,
} = listSlice.actions;

export { listsAdapter };

export default listSlice;
