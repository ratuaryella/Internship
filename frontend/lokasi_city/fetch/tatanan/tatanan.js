const fetch = require('node-fetch');
const config = require('../../config');

const getAllTatanan = (req) => {
    let status;
    return fetch(`${config.API_URL_SERVICES}/get-all-tatanan`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + req.cookies.user_token,
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        }
    }).then(response => {
        status = response.status;
        return response.json();
    }).then(responseJson => {
        return {
            status: status,
            data: responseJson
        }
    })
}

module.exports = {
    getAllTatanan
}