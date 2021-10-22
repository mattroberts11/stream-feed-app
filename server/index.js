const express = require('express');
const cors = require('cors');
const { connect } = require('getstream');

require('dotenv').config({path: '../.env'});

const app = express();
const port = 5000;

const api_key = process.env.REACT_APP_API_KEY;
const api_secret = process.env.REACT_APP_API_SECRET;
const app_id = process.env.REACT_APP_APP_ID;

app.use(cors());
app.use(express.json());


const serverClient = connect(api_key, api_secret, app_id);



app.post('/token', async (req, res) => {
  // create token here with userID from the front end req.body
  console.log('TOKEN REQ.BODY', req.body);
  
  const { user } = req.body;

  const token = serverClient.createUserToken(user);

  try {
    res.status(200).send(token);
  } catch(err) {
    res.status(500).send("Error getting token", err);
  }

  // res.status(200).send('heres your token!');
})

app.listen(port, () => {
  console.log(`Stream Feed App listening on port ${port}`);
})