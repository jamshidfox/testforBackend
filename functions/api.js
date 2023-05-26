const express = require('express');
const serverless = require('serverless-http');
const bp = require('body-parser');
const app = express();

const user = require('../route/user');
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.use(user);

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
