const Statistic = require('../lib/codebreaker/statistic');

const expect = require('chai').expect;
var assert = require('assert');

describe('Statistic', function() {
  var stat = new Statistic();

  describe('#show()', function() {
    it('should return true', function() {
      assert.equal(stat.show(), true);
    });
  });

  describe('#save()', function() {
    it('should return true', function() {
      assert.equal(stat.save(), true);
    });
  });
});