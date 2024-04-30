import express from 'express'
import knex from 'knex'
import knexfile from '../knexfile.js'
import  { db} from './db.js'
import { v4 as uuidv4 } from 'uuid';
import {app} from './app.js'
//Get book details
export function setupBookRoutes(app) {
app.get('/book/:id', async (req, res, next) => {
    const todo = await db('todos').select('*').where('id', req.body.id).first()
    if (!todo) return next()
    res.render('todo-detail', {
      todo,
    })
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
app.post('/update-todo/:id', async (req, res, next) => {
    const todo = await db('todos').select('*').where('id', req.params.id).first()
  
    if (!todo) return next()
  
    await db('todos').update({ title: req.body.title,priority: req.body.priority, }).where('id', todo.id)
    sendTodosToAllConnections()
    sendTodoDetail(todo.id);
    res.redirect('back')
  })
}