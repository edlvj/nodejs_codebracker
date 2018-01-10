var fs = require('fs');
const YAML = require('yamljs');

var Statistic = function () {
  this.filename = './statistic.yml';
};

Statistic.prototype.show = function (callback) {
  fs.readFile(this.filename, "utf8", function(err, data) {
    if (err) throw err;
    callback(YAML.parse(data));
  });
};

Statistic.prototype.save = function (username, attemps) {
  var record = YAML.stringify([{ username: username, attemps: attemps, date: new Date().toLocaleDateString() }], 1);
  fs.appendFile(this.filename, record, function (err) {
    if (err) throw err;
  });
  return true;
};

module.exports = Statistic;