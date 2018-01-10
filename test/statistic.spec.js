const Statistic = require('../lib/codebreaker/statistic');

var fs = require('fs');
var simple = require('simple-mock');
const expect = require('chai').expect;
var assert = require('assert');

describe('Statistic', function() {
  var stat = new Statistic();
  simple.mock(stat, 'filename', '/home/ed/nodejs_codebreaker/test/fixtures/statistic-test.yml');
  
  before(function() { 
    fs.open('./test/fixtures/statistic-test.yml', 'w', function (err, file) {
      if (err) throw err;
    });
  });

  describe('#save(username, attemps)', function() {
    it('should return true', function() {
      assert.equal(stat.save('stepka', 4), true);
    });
  });

  context('#show()', function() {
    it('should return true', function() {
      stat.show(function(data){
        assert.equal(data[0].username, "stepka");
        assert.equal(data[0].attemps, 4);
      }); 
    });
  });

  after(function() { 
    fs.unlink('./test/fixtures/statistic-test.yml', function (err) {
      if (err) throw err;
    });
  });
});