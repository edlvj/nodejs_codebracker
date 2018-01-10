var simple = require('simple-mock');
const expect = require('chai').expect;
var assert = require('assert');

const Codebreaker = require('../lib/codebreaker');

describe('Codebreaker', function() {
  describe('constructor', function() {
    var cb = new Codebreaker();

    it('hit_count should return 1', function() {
      assert.equal(cb.hint_count, 1);
    });

    it('attempt_count should return 10', function() {
      assert.equal(cb.attempt_count, 10);
    });

    it('attempt_count should return 4 digits', function() {
      assert.equal(/(^([1-6]{4})$)/.test(cb.secret_code.join("")), true);
    });

    it('init state return proceed', function() {
      assert.equal(cb.getState(), 'proceed');
    });
  });

  describe('#hint()', function() {
    var cb = new Codebreaker();
    simple.mock(cb, 'secret_code', [1,1,1,1]);

    // it('return one number from secret_code', function() {
    //   assert.equal([1,1,1,1].includes(cb.hint()), true);
    // });
  });

  describe('#match_guess()', function() {
    var cb = new Codebreaker();
    simple.mock(cb, 'secret_code', [1,2,3,4]);

    it('attempt_count should return 9 and ""', function() {
      assert.equal(cb.match_guess('0000'), "");
      assert.equal(cb.attempt_count, 9);
    });

    it('attempt_count should return 8 and "----"', function() {
      assert.equal(cb.match_guess('4321'), "----");
      assert.equal(cb.attempt_count, 8);
    });

    it('attempt_count should return 7 and "+++"', function() {
      assert.equal(cb.match_guess('1235'), "+++");
      assert.equal(cb.attempt_count, 7);
    });
  });

  describe('#checkState(code)', function() {
    it('state should return win', function() {
      var cb = new Codebreaker();
      simple.mock(cb, 'secret_code', [1,1,1,1]);
      cb.checkState('1111');
      assert.equal(cb.getState(), 'win');
    });

    it('state should return lost', function() {
      var cb = new Codebreaker();
      simple.mock(cb, 'attempt_count', 0);
      cb.checkState('1234');
      assert.equal(cb.getState(), 'lost');
    });
  });
});