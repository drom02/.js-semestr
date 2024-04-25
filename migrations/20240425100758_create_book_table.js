/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('books', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('author')
      table.string('language')
      table.string('abstract')
      
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = async (knex) => {
    await knex.schema.dropTable('books')
  }