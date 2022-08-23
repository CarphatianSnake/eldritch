import { createSlice } from "@reduxjs/toolkit/dist";

export const difficultiesSlice = createSlice({
  name: 'difficulties',
  initialState: {
    difficulty: 'normal'
  },
  reducers: {
    getDifficulty(state, { payload }) {
      state.difficulty = payload
    }
  }
})

const {reducer, actions} = difficultiesSlice

export const { getDifficulty } = actions
export default reducer