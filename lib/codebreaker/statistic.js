const STAT_FILE = './stat.json';

var Statistic = function () {
  var file = STAT_FILE;
};

Statistic.prototype.show = function () {
  return true;
};

Statistic.prototype.save = function (user, code) {
  return true;
};

module.exports = Statistic;