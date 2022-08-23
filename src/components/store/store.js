import { configureStore } from "@reduxjs/toolkit"

import ancientsSlice from "../Ancients/ancientsSlice"

const store = configureStore({
  reducer: { ancientsSlice },
  devTools: process.env.NODE_ENV !== 'production'
})

export default store