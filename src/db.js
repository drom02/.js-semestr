import knex from 'knex'

import knexfile from '../knexfile.js'
export const db = knex(knexfile[process.env.NODE_ENV || 'development'])

export const getUserByToken = async (token) => {
    const user = await db('users').where({ token }).first()
  
    return user
  }