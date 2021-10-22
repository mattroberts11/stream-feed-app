// const express = require('express');
// const cors = require('cors');
const { connect } = require('getstream');

require('dotenv').config({path: '../.env.local'});

// const app = express();
// const port = 5000;

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const app_id = process.env.APP_ID;

// app.use(cors());
// app.use(express.json());
const serverClient = connect(api_key, api_secret, app_id);
const token = serverClient.getOrCreateToken();

const client = connect(api_key, api_secret)

const getUsers = async () => {
  return await serverClient.getUsers();
}

getUsers();