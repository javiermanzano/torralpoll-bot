require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

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
  console.log('POOOOOST');
  var data = {
    form: {
      token: process.env.SLACK_AUTH_TOKEN,
      channel: "#hd-may19-polls",
      text: "Hi! :wave: \n I'm the most fair & easy poll creator \n 100% secure. No manipulation allowed"
    }
  };
  request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
    // Sends welcome message
    res.json();
  });
});