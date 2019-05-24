require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');

const handler = require('./handler');

const app = express();
const PORT = process.env.PORT || 3000;
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

app.post('/', async (req, res) => {
  const command = req.body.text;
  const { torralbotCommand, text, arguments } = handler.process({ command });
  var data = {
    form: {
      token: process.env.SLACK_AUTH_TOKEN,
      channel: `#${req.body.channel_name}`,
      text,
    }
  };
  try {
    const extraData = await handler.handle({ torralbotCommand, arguments });
    if (extraData) {
      data.form.text += `\n${extraData}`;
    }
    await request.post('https://slack.com/api/chat.postMessage', data);
    res.json();
  } catch(err) {
    console.error(err);
    res.send(500);
  }
});