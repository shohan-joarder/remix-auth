// db.js
import mysql from 'mysql2/promise';

const connect = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auth_app',
});

export default connect;
