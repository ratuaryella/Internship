const fetchPoi = require("../../fetch/poi/poi-bvarta");

const getPoiRegion = (req, res) => {
  return fetchPoi
    .getPoiRegion(req)
    .then((responseJson) => {
      res.json(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  getPoiRegion,
};
