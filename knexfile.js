// knexfile.js
export default {
    development: {
        client: 'sqlite3',
        connection: {
          filename: './bookDB.sqlite',
        },
        useNullAsDefault: false,
      }
  }