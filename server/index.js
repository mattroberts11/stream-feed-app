const express = require('express');
const cors = require('cors');
const { connect } = require('getstream');

require('dotenv').config({path: '../.env.local'});

const app = express();
const port = 5000;

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const app_id = process.env.APP_ID;

app.use(cors());
app.use(express.json());


const serverClient = connect(api_key, api_secret, app_id);
// const token = serverClient.createUserToken()


app.post('/token', async (req, res) => {
  // create token here with userID from the front end req.body
  console.log('TOKEN REQ.BODY', req.body);
})

app.listen(port, () => {
  console.log(`Stream Gear Feed App listening on port ${port}`);
})