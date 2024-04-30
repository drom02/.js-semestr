import express from 'express'
import cookieParser from 'cookie-parser'
import knex from 'knex'
import knexfile from '../knexfile.js'
import  { db} from './db.js'
import { v4 as uuidv4 } from 'uuid';
export const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(async (req, res, next) => {
    const token = req.cookies.token
    if (token) {
      res.locals.user = await getUserByToken(token)
    } else {
      res.locals.user = null
    }
  
    next()
  })
import { setupBookRoutes } from './appBookManagement.js';
setupBookRoutes(app);
  //Remove
  app.get('/remove-todo/:id', async (req, res,next) => {
    const todo = await db('todos').select('*').where('id', req.params.id).first()
    if (!todo) return next();
    deleteTodo(todo,res);
    res.redirect('/')
  })
  app.get('/', async (req, res) => {
    res.render('basicView', {
      title: 'Test',
    })
  })
  //Error
app.use((req, res) => {
    res.status(404)
    res.send('404 - Stránka nenalezena')
  })
  //Error
  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500)
    res.send('500 - Chyba na straně serveru')
  })