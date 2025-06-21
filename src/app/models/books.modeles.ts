import { model, Schema } from "mongoose";
import BookInterfaces from "../interfaces/books.interfaces";

//  Create Book Schema

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
    min: [0, "Copies must be a positive number"],
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
 
// Create checkedAvailability instances method

bookSchema.methods.checkedAvailability = function () {
  this.available = this.copies > 0;
  return this.save();
};

//  Create and Export Book Modeles

 const Book = model("Book",bookSchema)
 export default Book;

