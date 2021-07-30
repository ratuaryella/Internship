const fetch = require("node-fetch");

const getPoiRegion = (req) => {
  return fetch('http://52.221.250.46:5020/api/v1.0/find-poi/basic-3', {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      "Accept-Charset": "utf-8",
    },
    body: JSON.stringify(req.body),
  })
  .then((response) => {
    return response.json();
  })
  .then((responseJson) => {
    return responseJson;
  });
};

module.exports = {
  getPoiRegion
};
