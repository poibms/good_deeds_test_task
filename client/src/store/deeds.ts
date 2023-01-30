import { createAction, createSlice } from "@reduxjs/toolkit";
import deedService from "../services/deeds.service";
import { DeedCreds, DeedsType, UpdateDeedCreds } from "../types/types";
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
    addNewDeedRecive: (state, action) => {
      state.entities.push(action.payload);
      state.error = null;
    },
    deedUpdated: (state, action) => {
      const deedIndex = state.entities.findIndex(deed => deed._id === action.payload._id);
      state.entities[deedIndex] = action.payload;
    },

    deedDeleted: (state, action) => {
      state.entities = state.entities.filter((deed: DeedsType) => deed._id !== action.payload);
    }
  },
});

const { actions, reducer: deedsReducer } = deedsSlice;

const { deedsRequested, deedsReceived, deedsRequestFailed, deedUpdated, deedDeleted, addNewDeedRecive } = actions;


export const addNewDeed =
  (payload: DeedCreds): AppThunk =>
  async dispatch => {
    dispatch(deedsRequested());
    try {
      const newDeed = await deedService.createDeed(payload);
      dispatch(addNewDeedRecive(newDeed));
    } catch (error: any) {
      const { message } = error.response.data;
      dispatch(deedsRequestFailed(message));
    }
  };

export const updateDeed =
  (payload: UpdateDeedCreds): AppThunk =>
  async dispatch => {
    dispatch(deedsRequested());
    try {
      const updatedDeed = await deedService.updateDeedData(payload);
      dispatch(deedUpdated(updatedDeed));
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

export const deleteDeedById = (postId: string): AppThunk => async dispatch => {
  dispatch(deedsRequested());
  try {
    await deedService.deleteDeed(postId);
    dispatch(deedDeleted(postId));
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
