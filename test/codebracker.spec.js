const Codebreaker = require('../lib/codebreaker');

const expect = require('chai').expect;

var assert = require('assert');

describe('Codebreaker', function() {
  var cb = new Codebreaker();

  describe('constructor', function() {
    it('hit_count should return 1', function() {
      assert.equal(cb.hint_count, 1);
    });

    it('attempt_count should return 10', function() {
      assert.equal(cb.attempt_count, 10);
    });
  });

  describe('#match_guess()', function() {
    
    it('attempt_count should return 9 ', function() {
      cb.match_guess('1111');
      assert.equal(cb.attempt_count, 9);
    });
  });

  describe('states of game', function() {
  });
  
});