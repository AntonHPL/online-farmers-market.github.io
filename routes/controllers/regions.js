const Region = require('../../models/region');

const getRegions = (req, res) => {
  Region
    .find()
    .then(regions => res.status(200).json(regions))
};

module.exports = { getRegions };