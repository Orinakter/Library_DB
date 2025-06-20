import { Schema } from "mongoose";
import { BookInterfaces } from "../interfaces/books.interfaces";

const bookSchema = new Schema<BookInterfaces>({
  title: {
    type: String,
    required: true,
  },
   author: {
    type: String,
    required: true,
   },
   genre:{
   type: String,
    required: true,
    enum:{
        values:["FICTION" , "NON_FICTION" , "SCIENCE" , "HISTORY" , "BIOGRAPHY" , "FANTASY"],
        message:"Value will be FICTION,NON_FICTION,SCIENCE,HISTORY,BIOGRAPHY,FANTASY",
    },
    uppercase:true,
   },
   isbn: {
    type: String,
    required: true,
    unique: [true, "this number already added"],
  },
  description: {
    type: String,
    default: "A brief summary or description of the book",
  },
  copies: {
    type: Number,
    required: [true, "Copies are required"],
    min: [0, "Copies number must be a non-negative number"],
  },
  available:{
    type: Boolean,
    default: true
  }

},{
    versionKey:false,
    timestamps:true,
}
);

