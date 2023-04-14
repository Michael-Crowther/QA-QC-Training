const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const path = require('path');
require('dotenv').config();

const app = express();
const port =  process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());


//setup postgreSQL pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const jwtsecret = process.env.JWT_SECRET;

console.log(database);


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
      const deactivated = user.deactivated;
      const isPasswordCorrect = isPasswordMatched(password, user.hashed_password, user.salt);
      if (isPasswordCorrect && deactivated == false) {
        const email = user.email;
        const userInfo = await getUserInfo(email);

        //Generate and sign a JWT authToken
        const payload = { email: user.email };
        const token = jwt.sign(payload, jwtsecret);

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

//authentication function called from the above express API
function auth(req, res, next) {
  const authToken = req.headers.authorization?.split(' ')[1];
  try {
    const decodedToken = jwt.verify(authToken, jwtsecret);
    req.user = { email: decodedToken.email };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}


//These next couple routes are for changing the password
//functionality can be found in the settings page

//route for checking password match
app.post('/api/checkPasswordMatch', async (req, res) => {
  try {
    const { email, currentPassword } = req.body;
    // fetch user from database using email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // check if user exists and get the hashed password
    if (result.rows.length > 0) {
      const hashedPassword = result.rows[0].hashed_password;

      // compare entered password with hashed password
      const passwordMatch = await bcrypt.compare(currentPassword, hashedPassword);

      // send response as JSON
      res.json({ passwordMatch });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//route for updating password
app.put('/api/updatePassword', async (req, res) => {
  const { email, password } = req.body;
  const newPassword = req.body.newPassword;

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the password in the database
  await pool.query('UPDATE users SET hashed_password = $1 WHERE email = $2', [hashedPassword, email]);

  // Return success message
  res.json({ message: 'Password updated successfully' });
});




//--------------------GOOGLE API HERE---------------------//

const credentials = {
  client_email: process.env.G_CLIENT_EMAIL,
  private_key: process.env.G_PRIVATE_KEY,
};

const jwtClient = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/documents']
});

const drive = google.drive({
  version: 'v3',
  auth: jwtClient
});

const docs = google.docs({
  version: 'v1',
  auth: jwtClient
});


//Route for reporting a bug and submitting to google doc

app.post('/report-bug', async (req, res) => {
  try {
    const { email, bugTitle, bugDescription } = req.body;

    const userInfo = await getUserInfo(email);
    const { firstName, lastName } = userInfo;
    const fileId = process.env.G_FILE_ID_BUG_REPORT;
    const fileContent = `${firstName} ${lastName}\n\nBug Title: ${bugTitle}\n\nBug Description: ${bugDescription}\n\n-----------------------------------------\n`;
    
 
    const requests = [
      {
        insertText: {
          text: `\n${fileContent}`,
          endOfSegmentLocation: {}
        }
      }
    ];

    const response = await docs.documents.batchUpdate({
      documentId: fileId,
      requestBody: {
        requests
      }
    });
    
    console.log(`File updated: ${response.data.id}`);
    res.status(200).json({ message: 'Bug report submitted.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error submitting bug report.' });
  }
});

//Request search term API
app.post('/request-term', async (req, res) => {
  try {
    const { email, searchTermRequest, searchTermDescription } = req.body;

    const userInfo = await getUserInfo(email);
    const { firstName, lastName } = userInfo;
    const fileId = G_FILE_ID_REQUEST_TERM;
    const fileContent = `${firstName} ${lastName}\n\nSearch Term: ${searchTermRequest}\n\nDescription: ${searchTermDescription}\n\n-----------------------------------------\n`;
    
 
    const requests = [
      {
        insertText: {
          text: `\n${fileContent}`,
          endOfSegmentLocation: {}
        }
      }
    ];

    const response = await docs.documents.batchUpdate({
      documentId: fileId,
      requestBody: {
        requests
      }
    });
    
    console.log(`File updated: ${response.data.id}`);
    res.status(200).json({ message: 'Bug report submitted.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error submitting bug report.' });
  }
});


// Serve static files from the /dist directory
app.use(express.static(path.join(__dirname, './dist')));

// Serve the index.html file for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});


//Start the server
app.listen(port, () => {
  console.log("Server started on port", port);
});