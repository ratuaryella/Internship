const fetch = require("node-fetch");
const config = require("../../config");

const getAllKegiatan = async (req) => {
  let status;
  return await fetch(`${config.API_URL_SERVICES}/get-all-kegiatan`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + req.cookies.user_token,
      "Content-type": "application/json",
      "Accept": "application/json",
      "Accept-Charset": "utf-8",
    },
  })
  .then((res) => {
    status = res.status;
    return res.json();
  })
  .then((json) => {
    return {
      status: status,
      data: json,
    };
  });
};

module.exports = {
  getAllKegiatan,
};
