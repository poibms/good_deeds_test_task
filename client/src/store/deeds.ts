import { createAction, createSlice } from "@reduxjs/toolkit";
import deedService from "../services/deeds.service";
import { DeedCreds, DeedsType } from "../types/types";
import { AppThunk, RootState } from "./createStore";

const deedsSlice = createSlice({
  name: 'deeds',
  initialState: {
    entities: [] as Array<DeedsType>,
    isLoading: true as boolean,
    error: null as string | null,
  },
  reducers: {
    deedsRequested: state => {
      state.isLoading = true;
    },
    deedsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    deedsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addNewDeed: (state, action) => {
      state.entities.push(action.payload);
      state.error = null;
    },
    deedUpdated: (state, action) => {
      const deedIndex = state.entities.findIndex(deed => deed._id === action.payload._id);
      state.entities[deedIndex] = action.payload;
    },
  },
});

const { actions, reducer: deedsReducer } = deedsSlice;

const { deedsRequested, deedsReceived, deedsRequestFailed, deedUpdated } = actions;


export const addNewDeed =
  (payload: DeedCreds): AppThunk =>
  async dispatch => {
    dispatch(deedsRequested());
    try {
      const newDeed = await deedService.createDeed(payload);
      dispatch(addNewDeed(newDeed));
    } catch (error: any) {
      const { message } = error.response.data;
      dispatch(deedsRequestFailed(message));
    }
  };

export const getAllDeeds = (): AppThunk => async dispatch => {
  dispatch(deedsRequested());
  try {
    const data = await deedService.getAllDeeds();
    dispatch(deedsReceived(data));
  } catch (error: any) {
    const { message } = error.response.data;
    dispatch(deedsRequestFailed(message));
  }
}

export const getDeedsByOwnerId = (id?: string) => (state: RootState) => {
  if (state.deeds.entities) {
    return state.deeds.entities.filter((deed: DeedsType) => deed.ownerId === id);
  }
}

export const getDeedsErrors = () => (state: RootState) => state.deeds.error;

export default deedsReducer;
