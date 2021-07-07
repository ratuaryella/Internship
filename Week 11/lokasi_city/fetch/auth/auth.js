const fetch = require('node-fetch');
const config = require('../../config');

const doLoginFetch = (req) => {
  let status;
  return fetch(`${config.API_URL_AUTH}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json",
      "Accept-Charset": "utf-8"
    },
    body: JSON.stringify({
      username: req.body.username,
      password: req.body.password
    })
  })
  .then(res => {
    status = res.status;
    return res.json();
  })
  .then(json => {
    return {
        status: status,
        data: json
    } 
  });
} 

const checkTokenFetch = (token) => {
  let status;
  return fetch(`${config.API_URL_AUTH}/check-token`, {
    method: 'GET',
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Charset": "UTF-8"
    }
  }).then(response => {
    status = response.status;
    return response.json();
  }).then(responseJson => {
    return {
        status: status,
        data: responseJson
    }
  });
}

module.exports = {
  doLoginFetch,
  checkTokenFetch
}