import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IList } from "../../../commons";

const initialState: {
  data: IList[];
  isLoading: boolean;
} = {
  data: [],
  isLoading: false
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    loadLists: (state) => {
      state.isLoading = true;
    },
    setLists: (state, action: PayloadAction<IList[]>) => {
      state.data = action.payload;
    },
    listsLoaded: (state, action: PayloadAction<IList[]>) => {
      state.isLoading = false;
      state.data = action.payload;
    }
  }
});

export const { loadLists, setLists, listsLoaded } = listSlice.actions;

export default listSlice;
