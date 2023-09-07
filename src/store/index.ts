import { configureStore } from '@reduxjs/toolkit'
import treeReducer from './treeSlice'

export const Store = configureStore({
  reducer: {
    tree: treeReducer,
  },
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
