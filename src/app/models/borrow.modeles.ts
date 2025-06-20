import { model, Schema } from "mongoose";
import { BorrowInterfaces } from "../interfaces/borrow.interface";

// //  Create Borrow Schema

const borrowSchema = new Schema<BorrowInterfaces>({
    book:{
        type:Schema.Types.ObjectId,
        ref : "Book",
        required: true,
    },
    quantity :{
        type: Number,
        required: true,
        min: [1,"Number will be Positive Value"]
    },
    dueDate : {
        type : Date,
        required : true
    }
},{
    versionKey:false,
    timestamps:true,
})

// Created and Export Borrow Modeles

const Borrow = model("Borrow",borrowSchema)

export default Borrow;