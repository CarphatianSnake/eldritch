import { createSlice } from "@reduxjs/toolkit/dist";

export const ancientsSlice = createSlice({
  name: 'ancients',
  initialState: {
    ancient: {}
  },
  reducers: {
    getAncient(state, { payload }) {
      state.ancient = payload
    }
  }
})

const {reducer, actions} = ancientsSlice

export const { getAncient } = actions
export default reducer