import express from 'express'
import knex from 'knex'
import knexfile from '../knexfile.js'
import  { db} from './db.js'
import { v4 as uuidv4 } from 'uuid';
import {app} from './app.js'
import { createUser } from './user.js';
import crypto from 'crypto'
import { newUserFavorites } from './appFavoritesManagement.js';

export async function  getUserByID(id){
    const user = await db('users').select('*').where('id', id).first();
    if (!user)return null;
        return user;    
}
export async function  getUserByToken(token){
    const user = await db('users').select('*').where('token', token).first();
    if (!user) return null;
        return user;    
}
  export async function login (nickname, password, res){
    const user = await db('users').select('*').where('nickname', nickname ).first();
    if (!user) return null
    const hash = crypto
      .pbkdf2Sync(password, user.salt, 100000, 64, "sha512")
      .toString("hex")
    if (user.hash !== hash) return null
    res.cookie('token', user.token)
    res.redirect('/')
    return user
  }
  export async function register (req, res){
    const checkUser = await db('users').select('*').where('nickname', req.body.nickname).first()
    if (!checkUser){
        let ident = uuidv4();
        const user = await createUser(ident, req.body.name, req.body.nickname,req.body.mail,req.body.role,req.body.password);
        newUserFavorites(user.id);
        //await db('users').insert(user);
        res.cookie('token', user.token)
        res.redirect('/')
    } 
  }
  export async function logout(res){
      res.cookie('token', '',{maxAge:0})
      res.redirect('/')
  }