import express from 'express'
import knex from 'knex'
import knexfile from '../knexfile.js'
import  { db} from './db.js'
export function setupBookFavoriteRoutes(app) {
//getBooks
app.get('/api/favoriteBooks', async (req,res) => {
    if(res.locals.user === null){
      res.json(null);
    }else{
      const data = await loadFavorites(res.locals.user);
      const output = await loadFavoriteBooks(data.favorites);
      res.json(output);
    }
     
    
  }) 
  app.post('/api/addFavoriteBooks', async (req,res) => {
   
    if(res.locals.user === null){
      return null
    } else{
      const data = await loadFavorites(res.locals.user);
      
      const newFavID = document.getElementById('detailView').getAttribute("book-id")
      console.log(newFavID)
      if(!newFavID) return null;
      data.favorites.push(newFavID);
      const entry = {
        id : newFavID,
        favorites : JSON.stringify(data.favorites),
        ratings : JSON.stringify(data.ratings)
      }
      await db('favorites').insert(entry);
    }
      
      
    }) 
}
  //load books
  export async function loadFavorites(user){
    if(user === null) return null
    const books = await db('favorites').select('*').where("id",user.id).first();
    books.favorites = JSON.parse(books.favorites)
    books.ratings = JSON.parse(books.ratings)
    if (!books) return null;
    return books;
  } 
  async function loadFavoriteBooks(ids){
    if(ids.length===0) return null;
    const bookArray = await db('books').select('*').whereIn("id", ids);
    if(!bookArray) return null;
    return bookArray;
}
  export async function addFavorite(user){
    let usersFavorites; 
     usersFavorites =JSON.parse(await db('favorites').select('*').where('id', user.id).first());
    if(usersFavorites){
    }
    await db('favorites').insert();
}
export async function newUserFavorites(idInit){
    let favoritesInit = [];
    let ratingsInit = [];
    const entry = {
        id : idInit,
        favorites : JSON.stringify(favoritesInit),
        ratings : JSON.stringify(ratingsInit)
    }
    await db('favorites').insert(entry);

    
}
