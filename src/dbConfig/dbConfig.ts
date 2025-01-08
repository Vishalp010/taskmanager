import mongoose from 'mongoose'

export async function connect(){
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection
    connection.on("connected",()=>{
      console.log('mongodb connected succefully')
    })
    connection.on('error',(error)=>{
      console.log('error connecting to database',error)
      process.exit()
    })
  } catch (error:any) {
    console.log('error connecting to database', error)
  }
} 