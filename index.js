require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const handler = require('./handler');

const app = express();
const PORT = 3000;
app.listen(process.env.PORT || PORT, function () {
  console.log(`Torralpoll is listening on port ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  return res.json({
    message: 'Torralpoll is taking care of your votes',
  });
});

app.post('/', (req, res) => {
  const command = req.body.text;
  const { torralbotCommand, text, arguments } = handler.process({ command });
  var data = {
    form: {
      token: process.env.SLACK_AUTH_TOKEN,
      channel: `#${req.body.channel_name}`,
      text,
    }
  };
  request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
    res.json();
  });
});