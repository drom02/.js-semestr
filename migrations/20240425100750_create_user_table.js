
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('users', (table) => {
      table.string('id').primary()
      table.string('name').notNullable()
      table.string('nickname').notNullable().unique()
      table.string('role').notNullable()
      table.string('mail').notNullable()
      table.string('hash').notNullable()
      table.string('salt').notNullable()
      table.string('token')
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = async (knex) => {
    await knex.schema.dropTable('users')
  }