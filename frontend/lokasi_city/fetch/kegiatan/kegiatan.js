const fetch = require('node-fetch');
const config = require('../../config');
var FormData = require('form-data');
const URL = "http://localhost:8083/kegiatan?name=";
const getCurrentDate = require('../../helper/current-date');
const currentDate = getCurrentDate();
const globalVariable = require('../../helper/globalVarible');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../lokasi_city/pics');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var uploadImg = multer({storage: storage});

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

const getFullKegiatan = (req) => {
    let status;

    var url = `${config.API_URL_SERVICES}/get-full-kegiatan`
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

const createKegiatan = (req) => {
    let status;

    var formData = new FormData();

    formData.append("id_tatanan", "");
    formData.append("nama_kegiatan", req.body.nama_kegiatan);
    formData.append("nama_tatanan", req.body.nama_tatanan);
    formData.append("jenis_indikator", req.body.jenis_indikator);
    formData.append("kategori", req.body.kategori);
    formData.append("nama_indikator", req.body.nama_indikator);
    formData.append("subindikator", req.body.subindikator);
    formData.append("pelaksana", req.body.pelaksana);
    formData.append("tanggal_kegiatan", req.body.tanggal_kegiatan);
    formData.append("longitude", req.body.longitude);
    formData.append("latitude", req.body.latitude);
    formData.append("deskripsi", req.body.deskripsi);
    formData.append("created_at", currentDate.dateAsiaJakarta);
    formData.append("created_by", req.userData.id);
    formData.append("gambar", URL + req.body.gambar.filename);

    return fetch(`${config.API_URL_SERVICES}/create-kegiatan`, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + req.cookies.user_token,
            "Content-Type": "multipart/form-data"
        },
        body: formData,
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

const createKegiatanNon = (req) => {
    let status;

    return fetch(`${config.API_URL_SERVICES}/create-kegiatan-non`, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + req.cookies.user_token,
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        },
        body: JSON.stringify({
            id_tatanan: "",
            nama_kegiatan: req.body.nama_kegiatan,
            nama_tatanan: req.body.nama_tatanan,
            jenis_indikator: req.body.jenis_indikator,
            kategori: req.body.kategori,
            nama_indikator: req.body.nama_indikator,
            subindikator: req.body.subindikator,
            pelaksana: req.body.pelaksana,
            tanggal_kegiatan: req.body.tanggal_kegiatan,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            deskripsi: req.body.deskripsi,
            alamat: req.body.alamat,
            created_at: currentDate.dateAsiaJakarta,
            created_by: req.userData.id
        }),
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

const getKegiatanByRole = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/get-role-kegiatan?`
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

const getKegiatanByUser = (req) => {
    let status;

    var url = `${config.API_URL_SERVICES}/get-user-kegiatan?user_id=`+req.cookies.id
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

const deleteKegiatan = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/delete-kegiatan?`
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

const editKegiatan = (req) => {
    let status;

    var params = new URLSearchParams(req.query);
    var url = `${config.API_URL_SERVICES}/update-kegiatan?`
    return fetch(url + params, {
        method: 'PATCH',
        headers: {
            "Authorization": "Bearer " + req.cookies.user_token,
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        },
        body: JSON.stringify({
            id: req.query.id,
            id_tatanan: req.body.id_tatanan,
            nama_kegiatan: req.body.nama_kegiatan,
            nama_tatanan: req.body.nama_tatanan,
            jenis_indikator: req.body.jenis_indikator,
            kategori: req.body.kategori,
            nama_indikator: req.body.nama_indikator,
            subindikator: req.body.subindikator,
            pelaksana: req.body.pelaksana,
            tanggal_kegiatan: req.body.tanggal_kegiatan,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            deskripsi: req.body.deskripsi,
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
    getAllKegiatan,
    getKegiatanById,
    getFullKegiatan,
    createKegiatan,
    uploadImg,
    createKegiatanNon,
    getKegiatanByRole,
    deleteKegiatan,
    editKegiatan,
    getKegiatanByUser
}