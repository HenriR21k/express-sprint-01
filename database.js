import mysql from 'mysql2/promise';

// Database Connection ---------------------------

const dbConfig = {
  database: process.env.DB_NAME || 'sql8659067',
  port: process.env.DB_PORT || 3306,
  host: process.env.DB_HOST || 'sql8.freemysqlhosting.net',
  user: process.env.DB_USER || 'sql8659067',
  password: process.env.DB_PSWD || 'Iea4DtMGbI',
  namedPlaceholders: true
};

let database = null;

try {
  database = await mysql.createConnection(dbConfig);
}
catch (error) {
  console.log('Error creating database connection: ' + error.message);
  process.exit();
}

export default database;