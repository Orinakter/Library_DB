import express, { Request, Response } from "express";
import { Book } from "../models/books.modeles";

export const bookRouter = express.Router();

// post book

bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Validation failed", error });
  }
});

// get all book

bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;
    const query = filter ? { genre: filter } : {};
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .limit(parseInt(limit as string));

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get books", error });
  }
});

// get single book by id

bookRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get book", error });
  }
});
 
// update books by id 

bookRouter.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });
    if (book){
      await book.checkedAvailability();
    }
    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update book", error });
  }
});


// deleted books by id 

bookRouter.delete("/:bookId", async (req: Request, res: Response) =>{
    try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.json({ success: true, message: 'Book deleted successfully', data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete book', error });
  }
})

