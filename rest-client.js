const request = require('request-promise');
const generateURL = (endpoint) => `${process.env.API_ENDPOINT}/${endpoint}`;

const get = async ({ url }) => await request.get(generateURL(url));

const post = async ({ url, body }) =>
  await request({
    method: 'POST',
    uri: generateURL(url),
    body,
    json: true,
  });

module.exports = {
  get,
  post,
};