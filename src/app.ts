import express, { Application, Request, Response } from 'express'
import { bookRouter } from './app/controller/books.controller';
const app:Application = express();

app.use(express.json())
app.use("/api/books",bookRouter)

app.get('/', (req:Request, res:Response) => {
  res.send('Library Db running')
})

export default app;