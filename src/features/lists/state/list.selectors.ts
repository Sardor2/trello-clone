import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { listsAdapter } from "./list-slice";

export const selectListsState = (state: RootState) => state.lists;

export const selectListData = createSelector(
  [selectListsState],
  (state) => state.data
);

export const {
  selectAll: selectAllLists,
  selectById: selectListById,
  selectIds: selectListIds,
  selectEntities: selectListEntities,
  selectTotal: selectListTotalNumber,
} = listsAdapter.getSelectors(selectListData);
