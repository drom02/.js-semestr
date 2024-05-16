import express from 'express'
import knex from 'knex'
import knexfile from '../knexfile.js'
import  { db} from './db.js'
import { v4 as uuidv4 } from 'uuid'; 
//Get book details
export function setupBookRoutes(app) {
app.get('/book/:id', async (req, res, next) => {
    const book = await db('books').select('*').where("id", req.params.id).first()
    if (!book) return null
    res.json(book);
  })
  //Add book
app.post('/add-book', async (req, res, next) => {
    const checkBook = await db('books').select('*').where('title', req.body.title).first()
    if (!checkBook){
      let ident = uuidv4();
      const book = {
          id: ident,
          title: req.body.title,
          author: req.body.author,
          language: req.body.language,
          abstract: req.body.abstract
    };
      await db('books').insert(book)
      console.log("success")
      res.redirect('/')
    }else{
      console.log("already exists")
    }
    
  })
//Remove
app.get('/remove-book/:id', async (req, res,next) => {
    const todo = await db('books').select('*').where('id', req.params.id).first()
    if (!todo) return next();
    deleteTodo(todo,res);
    res.redirect('/')
  })
  //Update
app.post('/update-book', async (req, res, next) => {
  if (!req.body.id) return next()
    const book = await db('books').select('*').where('id', req.body.id).first()
    if (!book) return next()
    await db('books').update({ title: req.body.title, author: req.body.author,language: req.body.language, abstract: req.body.abstract }).where('id', book.id)
    res.redirect('back')
  })
//getBooks
app.get('/api/books', async (req,res) => {
  const data = await loadBooks();
  res.json(data);

})
//Delete book
app.post('/delete-Book',async (req, res, next) => {
  if (!req.body.id) return next()
    const book = await db('books').select('*').where('id', req.body.id).first()
    if (!book) return next()
    await db('books').where('id', book.id).del();
    res.redirect('/')
})
}

//load books
export async function loadBooks(){
  const books = await db('books').select('*').orderBy('title').limit(100)
  if (!books) return null;
  return books;
} 