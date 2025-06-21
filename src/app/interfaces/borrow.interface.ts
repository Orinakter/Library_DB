import { Types } from "mongoose";

export interface BorrowInterfaces{
    book : Types.ObjectId,
    quantity : number,
    dueDate : Date
}