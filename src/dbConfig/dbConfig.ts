import mongoose from 'mongoose'

// export async function connect(){
//   try {
//     mongoose.connect(process.env.MONGO_URI!)
//     const connection = mongoose.connection
//     connection.on("connected",()=>{
//       console.log('mongodb connected succefully')
//     })
//     connection.on('error',(error)=>{
//       console.log('error connecting to database',error)
//       process.exit()
//     })
//   } catch (error:any) {
//     console.log('error connecting to database', error)
//   }
// } 
export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!); 
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (error: Error) => { 
      console.error("Error connecting to the database", error);
      process.exit(1)
    });
  } catch (error: unknown) { 
    if (error instanceof Error) {
      console.error("Error connecting to the database:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
}