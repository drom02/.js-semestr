import express from 'express'
import cookieParser from 'cookie-parser'
import knex from 'knex'
import knexfile from '../knexfile.js'
import  { db} from './db.js'
import { v4 as uuidv4 } from 'uuid';
import { getUserByToken,login,register,logout } from './appUserManagement.js';
import {setupGraphicRoutes} from  './appGraphicManagement.js';
import { setupBookFavoriteRoutes } from './appFavoritesManagement.js'
export const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
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
setupGraphicRoutes(app);
setupBookFavoriteRoutes(app);
//Validate
app.get('/validateRole', async (req, res,next) => {
  if(res.locals.user){
    if(res.locals.user.role==="admin"){
      res.send(true);
    }
  }else{
    res.send(false);
  }
})
  //Remove
  app.get('/remove-todo/:id', async (req, res,next) => {
    const todo = await db('todos').select('*').where('id', req.params.id).first()
    if (!todo) return next();
    deleteTodo(todo,res);
    res.redirect('/')
  })
 //landing page
  app.get('/', async (req, res) => {
    res.render('basicView', {
      title: 'Test',
    })
  })
  //register page
  app.get('/registerForm', async (req, res) => {
    res.render('registerUser', {
      title: 'Test',
    })
  })
   //register new user page
   app.post('/register-user', async (req, res) => {
    console.log('registrace');
    register(req,res);
  })
  //login
  app.post('/login', async (req, res) => {
    login(req.body.nickname,req.body.password,res);
  })
  //logout
  app.post('/logout', async (req, res) => {
    console.log('logout')
   logout(res);
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