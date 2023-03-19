import express from 'express';
import { Sequelize } from 'sequelize';
import User from './models/User.js';

const app = express();

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'qa_qc_bible',
  username: 'mcrowther@wysslingconsulting.com',
  password: 'Wyssling1',
  host: 'localhost',
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Initialize the User model
User.init(sequelize);

// Define routes and middleware here...

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});

export { sequelize };