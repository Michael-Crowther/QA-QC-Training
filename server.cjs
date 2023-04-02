const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port =  5000;

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

//setup postgreSQL pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "qa_qc_bible",
  password: "Scammerscaneatmybutt1!",
  port: 5432,
});

// Define a function to check if the entered password matches the hashed password
const isPasswordMatched = (password, hashed_password, salt) => {
  return bcrypt.compareSync(password, hashed_password);
};

//Define a route for handling login requests
app.post('/login', async (req, res) => {
  try{
    //Extract the email and password from the request body
    const { email, password } = req.body;

    //Query the database to see if there is a user with the given email and password
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await pool.query(query, values);

    // If user is found, check if entered password matches hashed password
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isPasswordCorrect = isPasswordMatched(password, user.hashed_password, user.salt);
      if (isPasswordCorrect) {
        const email = user.email;
        const userInfo = await getUserInfo(email);

        //Generate and sign a JWT authToken
        const payload = { email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET);


        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } 
  catch(error){
    //If an error occurs, send a 500 response
    console.log(error.message);
    res.status(500).json({message: 'Server error'});
  }
});


//This function gets user information from the database to be displayed on settings page
async function getUserInfo(email) {
  try {
    const result = await pool.query(`SELECT "firstName", "lastName", email FROM users WHERE email = $1`, [email]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Expose getUserInfo through a REST API
app.get('/api/user', auth, async (req, res) => {
  const email = req.user.email;
  const userInfo = await getUserInfo(email);
  res.json(userInfo);
});
function auth(req, res, next) {
  const authToken = req.headers.authorization?.split(' ')[1];
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = { email: decodedToken.email };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

//Start the server
app.listen(port, () => {
  console.log("Server started on port", port);
});