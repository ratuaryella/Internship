const fetch = require('node-fetch');
const config = require('../../config');

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
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile_number: req.body.mobile_number,
            status: req.body.status,
            kode_wilayah: req.body.kode_wilayah,
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

module.exports = {
    getAllUsers,
    createUser
}