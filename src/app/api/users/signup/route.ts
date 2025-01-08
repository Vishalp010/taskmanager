import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!); // Await the connection to ensure it's resolved
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (error: Error) => {
      console.error("Error connecting to the database", error);
      process.exit(1); // Non-zero exit code indicates failure
    });
  } catch (error) {
    // Narrow the type of `error`
    if (error instanceof Error) {
      console.error("Error connecting to the database:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
}
