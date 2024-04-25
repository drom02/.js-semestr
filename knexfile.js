// knexfile.js
export default {
    client: 'sqlite3',
    connection: {
      filename: './bookDB.sqlite',
    },
    useNullAsDefault: false,
  }