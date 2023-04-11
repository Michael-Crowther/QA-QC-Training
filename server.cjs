const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
require('dotenv').config();

const app = express();
const port =  5000;

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());


//setup postgreSQL pool
const pool = new Pool({
  user: "postgres",
  host: "qa-qc-bible",
  database: "qa_qc_bible",
  password: "Scammerscaneatmybutt1!",
  port: 5432,
});

const jwtsecret = "fj456ksks`=-[]./drbnms";

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
  client_email: 'qa-qc-bible@qa-qc-bible.iam.gserviceaccount.com',
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSOMxHhd0LEcYc\nRHPAFRbnVFnsZV1k2cRaJxXed4h5rTBjo0S5k7osLSFFDTjfCAURWPIUYWjBNQ+u\n7XKbVnCw7oPg60wTVcpg+PSPZenz5TDQeo6D19/8N1Wty7c3KGn2FGurJfXzziBA\nsCRSXdMb13A3ARhUD/om104xFE1l/VyfxIh75u6OGaQeqMLxL5LDTMVnRs70nwSx\nfJj3F1Oh54fj3COn8++N/wPrPPyADirMKCotjsr9i2njnd3Pwy6ln9HtOy5xG+Q5\nW7J0qincrWTbqCcX/yfcglmpFaAu3P1lTtq4hK1ajV0k6yFv2k0dwouddkzP6bhf\nk3p4NDcRAgMBAAECggEAIyUcvc5a5IldqgclpNTBxf3bpMJTiVNA2OOU6+Lm/ZSf\nNOEsUawpYU5QNBegTOUt17cbjZ21YiupShDnaqHaaDIP+S/NQaRDl8+3LywWH1DP\nRuNeZRtXlnZ3y/z1TfLjOCE02OGZS1/IE5h/EggejZaIa6GyvAcJxqmTKHBg+i5C\nMOzSzy5n/6rmjAD2nFosU2nNZehp+adniAvIYbP+N29HKi9xlulbaBO8ruae2wVx\nOTOqAZWmS4JB5ai3zqr1l8okqNF2zev1kA/Y6O1PASMzZ+XICij5i5VtBlCRyIRE\nUxyJGlS+TlhdXO32MjKbYMsGushGsOPONfQitbpzywKBgQD2008twn8okkLc65B9\nvxaEZhcKvOtou+qZ44IF7kn5sxy85pvoq0iShjE/vZjRZ/BP2yY0b1Rxgn4/bITI\n4zxCmLHjnyJVgW3Fp+rO/UIKto+BKERFzEfsOz/Y6smU3Xll0op/bQzKx2fKv1LE\npbz1stFDwG78uoVJ0boDpauX2wKBgQDaCS8dBE8Ve1tD2tI1EP6aRb+Qf4h8K+RM\nuSE40mw5bv8p3Tz27YG1J1Hp0/V2F8tS6wFk8Y62Tn4vaK3TLVjr9oFLwTnQD2dh\nwQmveP2OEHzPLBQN+KQFobpOGARVl/lRy9PypUCclR38KfW0BPzWvJUdz4X8y3EX\n6QAbMwEmgwKBgEqW7v2YIk9Da/tRILgvcAGQzHPNRaK/7xSUQS3Dpg1UiGG5mvIE\nGQlWjjmB9VWLAH9Rbck4v58R3U8TX0lKCmLhvBhadci7NU4fAYGN3VBZfSJ95avm\nIPINsay+vy5Cg7Y2mu4JKW16Ny55BO0yXNkvMbg0xhWP1EnLnFgPz7wzAoGBALrf\naDvsd4On6H7ty4CkAjNjWF6Wj/os/E0t1uWGpC9NjPDqp9fTlHoZK0HH4vfGSQPW\nW6mSx4hFGi20AFeg5DfJXOP6xnwm16qW8qAsiNT8GJzP4Jhg5OPWy4EnYH+j85JB\nqnSrYgdSXxLDO82BANtjYkLcnLAgBdxCXU7ylifVAoGBALIoFSeXp/Ld+z4uWH4F\n9qSUIW+MZeHdc5nwxboPr9XJXMpZ1L3bFs72z2L6z8CW18d548znLBEZl9lS50Gm\n1xJKVPJ2RhAlHFnZJ9HixJ9j8xvvKBC8o0XR+6DwZlxTsTbsJmwu6ZY3oO44bBDv\nYL0seH6Ma/avHEuy+m5kWwgn\n-----END PRIVATE KEY-----\n",
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
    const fileId = '1y_7bf82ZqhTMv28owTKE7VPwGf2wX96ecE4dwtsn1pU';
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
    const fileId = '1ngSJVJwqD4kSUR0YdK3Cvh0Z5nLZEHXrWEen6432chM';
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


//Start the server
app.listen(port, () => {
  console.log("Server started on port", port);
});