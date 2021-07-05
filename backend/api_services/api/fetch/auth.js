const fetch = require('node-fetch');
const config = require('../../config/config');

const fetchAuth = (token) => {
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
    fetchAuth
}