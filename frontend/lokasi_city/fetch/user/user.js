const fetch = require('node-fetch');
const config = require('../../config');
const getCurrentDate = require('../../helper/current-date');
const currentDate = getCurrentDate();
const globalVariable = require('../../helper/globalVarible');

const getAllUsers = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_AUTH}/get-all-users?`
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

const getAllRoles = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_AUTH}/get-roles?`
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

const createUser = (req) => {
    let status;
    return fetch(`${config.API_URL_AUTH}/create-user`, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + req.cookies.user_token,
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        },
        body: JSON.stringify({
            id_role: req.body.id_role,
            email: req.body.email,
            password: req.body.password,
            password_confirmation: req.body.password_confirmation,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile_number: req.body.mobile_number,
            status: "true",
            kode_wilayah: ({
                kode_prov: [req.body.kode_prov],
                kode_kabkot: [req.body.kode_kabkot],
                kode_kec: [req.body.kode_kec],
                kode_desa: [req.body.kode_desa]

            }),
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

const deleteUser = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_AUTH}/delete-user?`
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

const getUserById = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_AUTH}/detail-user?`
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
    getAllUsers,
    getAllRoles,
    createUser,
    deleteUser,
    getUserById
}