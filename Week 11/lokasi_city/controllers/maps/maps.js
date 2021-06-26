const index = (req, res, next) => {
    res.render('./pages/maps/map-home');
}

module.exports = {
    index,
}