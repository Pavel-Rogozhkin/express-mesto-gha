const console = require('console');

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
  console.log(res);
};
