import { configureStore } from "@reduxjs/toolkit"

import ancientsSlice from "../Ancients/ancientsSlice"
import difficultiesSlice from '../Difficulties/difficultiesSlice'

const store = configureStore({
  reducer: { ancientsSlice, difficultiesSlice },
  devTools: process.env.NODE_ENV !== 'production'
})

export default store