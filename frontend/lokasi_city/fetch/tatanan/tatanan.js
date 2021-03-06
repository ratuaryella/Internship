const fetch = require('node-fetch');
const config = require('../../config');
const getCurrentDate = require('../../helper/current-date');
const currentDate = getCurrentDate();
const globalVariable = require('../../helper/globalVarible');

const getAllTatanan = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/get-all-tatanan?`
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

const getFullTatanan = (req) => {
    let status;

    var url = `${config.API_URL_SERVICES}/get-full-tatanan`
    return fetch(url, {
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

const getTatananNama = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/get-tatanan-nama?`
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

const getNamaJenis = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/get-tatanan-nama-jenis?`
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

const getNamaJenisKategori = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/get-tatanan-nama-jenis-kategori?`
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

const getNamaJenisKategoriIndikator = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/get-tatanan-nama-jenis-kategori-indikator?`
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

const createTatanan = (req) => {
    let status;
    return fetch(`${config.API_URL_SERVICES}/create-tatanan`, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + req.cookies.user_token,
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        },
        body: JSON.stringify({
            nama_tatanan: req.body.nama_tatanan,
            jenis_indikator: req.body.jenis_indikator,
            kategori: req.body.kategori,
            nama_indikator: req.body.nama_indikator,
            subindikator: req.body.subindikator,
            created_at: currentDate.dateAsiaJakarta,
            created_by: req.userData.id
    })
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

const deleteTatanan = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/delete-tatanan?`
    return fetch(url + params, {
        method: 'PATCH',
        headers: {
            "Authorization": "Bearer " + req.cookies.user_token,
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        },
        body: JSON.stringify({
            deleted_at: currentDate.dateAsiaJakarta,
            status: 0,
            deleted_by: req.userData.id
    })
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

const getTatananById = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/get-tatanan?`
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

const editTatanan = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/update-tatanan?`
    return fetch(url + params, {
        method: 'PATCH',
        headers: {
            "Authorization": "Bearer " + req.cookies.user_token,
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        },
        body: JSON.stringify({
          nama_tatanan: req.body.nama_tatanan,
          jenis_indikator: req.body.jenis_indikator,
          kategori: req.body.kategori,
          nama_indikator: req.body.nama_indikator,
          subindikator: req.body.subindikator,
          updated_at: currentDate.dateAsiaJakarta,
          updated_by: req.userData.id
    })
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
    getAllTatanan,
    createTatanan,
    deleteTatanan,
    getTatananById,
    editTatanan,
    getFullTatanan,
    getTatananNama,
    getNamaJenis,
    getNamaJenisKategori,
    getNamaJenisKategoriIndikator
}