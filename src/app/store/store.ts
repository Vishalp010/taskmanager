import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../features/taskmanager/taskManagerSlice"
export const store = configureStore({
  //iske andr jitne b total reducer h hmaare paas wo aayge 
  reducer: {
    task:taskReducer,   
  }
})

// export default store
// Type for RootState (i.e., the entire state of the Redux store)
export type RootState = ReturnType<typeof store.getState>;

// Type for AppDispatch (optional but useful for dispatch typing)
export type AppDispatch = typeof store.dispatch;