import mongoose from "mongoose";

const connectToDb = () => {
  mongoose.connect(
    `mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@cluster0.ggn2qxi.mongodb.net/blogChef?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};
export default connectToDb;
