import express, { Request, Response } from "express";
import Borrow from "../models/borrow.modeles";
import Book from "../models/books.modeles";
export const borrowRouter = express.Router();

// Route to borrow a book and update book copies

borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const findBook = await Book.findOneAndUpdate(
      {
        _id: body.book,
        copies: { $gte: body.quantity },
      },
      {
        $inc: { copies: -body.quantity },
      },
      { new: true }
    );
    if (findBook) {
      await findBook.checkedAvailability();
    }

    const data = await Borrow.create(body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: data,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Validation failed", error });
  }
});

// // Route to get summary of borrowed books with total quantities

borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: data,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Validation failed", error });
  }
});
