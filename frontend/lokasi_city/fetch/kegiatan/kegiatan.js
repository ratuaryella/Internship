const fetch = require('node-fetch');
const config = require('../../config');

const getAllKegiatan = (req) => {
    let status;


    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/get-all-kegiatan?`
    return fetch(url + params, {
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

const getKegiatanById = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/get-kegiatan?`
    return fetch(url + params, {
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
    getAllKegiatan,
    getKegiatanById
}