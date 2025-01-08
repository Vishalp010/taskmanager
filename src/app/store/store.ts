import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../features/taskmanager/taskManagerSlice"
export const store = configureStore({
  //iske andr jitne b total reducer h hmaare paas wo aayge 
  reducer: {
    task:taskReducer,   
  }
})

// export default store
