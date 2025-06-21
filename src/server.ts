import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
const port = 5000;
let server: Server;

//  Created async function thats connect mongodb

const connectServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://librarayDbUser:piyfRydzhlGYsLUQ@cluster0.fo90p.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("successfully connected mongoDb atlas");
    server = app.listen(port, () => {
      console.log(`library server running on : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectServer();
