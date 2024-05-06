import express from 'express'
import knex from 'knex'
import knexfile from '../knexfile.js'
import  { db} from './db.js'
export function setupBookFavoriteRoutes(app) {
//getBooks
app.get('/api/books', async (req,res) => {
    const data = await loadBooks();
    res.json(data);
  
  }) 
}
  //load books
  export async function loadBooks(){
    const books = await db('books').select('*').orderBy('title').limit(100)
    if (!books) return null;
    return books;
  } 
  export async function addFavorite(user,){
    let usersFavorites; 
     usersFavorites =JSON.parse(await db('favorites').select('*').where('nickname', nickname ).first());
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
