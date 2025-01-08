import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks:[],    //yaha hum todo ki initial state track  krege
}

export const taskSlice = createSlice({
  name : 'task',
  initialState,
  //reducers k andr aane wali saari cheeje Reducer count hoti h 
  reducers:{
    addTask: (state,action) => {
      const task = {
        id : nanoid(),
        text : action.payload,
      }
      state.tasks.push(task)
    },
    removeTask :(state,action)=>{
      state.tasks = state.tasks.filter((task)=>(
        task.id !== action.payload
      ))
    },
    updateTask:(state,action)=>{
      const {id,text} = action.payload
      const existingTask = state.tasks.find((task)=>task.id ===id)
      if(existingTask){
        existingTask.text = text
      }
    }
  }
})

export const {addTask,removeTask,updateTask} = taskSlice.actions   //yaha humne ye actions ki form me isliy export kra h kuki aage ye actions hi perform krega 
//actions me saare action aate h

export default taskSlice.reducer