import express, { Request, Response } from "express";
import { Book } from "../models/books.modeles";

export const bookRouter = express.Router();

bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res
      .status(201)
      .json({
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

bookRouter.get('/',async(req: Request, res: Response)=>{
    try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query = filter ? { genre: filter } : {};
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(parseInt(limit as string));

    res.json({ success: true, message: 'Books retrieved successfully', data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get books', error });
  }
})
