import { Types } from "mongoose";

// Create and Export Borrow Interfaces

export interface BorrowInterfaces{
    book : Types.ObjectId,
    quantity : number,
    dueDate : Date
}