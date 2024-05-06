import crypto from 'crypto'
import  { db } from './db.js'
export const createUser = async (ident,name, nickname, mail, role, password) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
    const token = crypto.randomBytes(16).toString('hex')
    const id = ident;
    const [user] = await db('users').insert({ id,name, nickname, mail, role, salt,  hash, token }).returning('*')
    
  return user
  }
