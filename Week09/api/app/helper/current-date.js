const moment = require('moment-timezone');

const currentDate = () => {
    let dateOb = new Date();
    let date = ("0" + dateOb.getDate()).slice(-2);
    let month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
    let years = dateOb.getFullYear();
    let hours = ("0" + dateOb.getHours()).slice(-2);
    let minutes = ("0" + dateOb.getMinutes()).slice(-2);
    let seconds = ("0" + dateOb.getSeconds()).slice(-2);
    let timestampNow = years + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    let dateAsiaJakarta = moment().tz("Asia/Jakarta").format();

    return {
        date: date,
        month: month,
        years: years,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        timestampNow: timestampNow,
        dateAsiaJakarta: dateAsiaJakarta
    }
}

module.exports = currentDate;