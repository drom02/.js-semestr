import crypto from 'crypto'
import  { db } from './db.js'
export const createUser = async (name, nickname, mail, password) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
    const token = crypto.randomBytes(16).toString('hex')
    const [user] = await db('users').insert({ name, nickname, mail, salt, hash, token }).returning('*')

  return user
  }
