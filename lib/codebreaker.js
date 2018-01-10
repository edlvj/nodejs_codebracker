var StateMachine = require('javascript-state-machine');
var generateCode = require('./codebreaker/secret_code.js');

const PROPER_POSITION = '+';
const WRONG_POSITION = '-';

var CodeBreaker = function () {
  this.hint_count = 1;
  this.attempt_count = 10;
  this.secret_code = generateCode();

  this.fsm = new StateMachine({
    init: 'proceed',
    transitions: [
      { name: 'win', from: 'proceed', to: 'win' },
      { name: 'lost', from: 'proceed', to: 'lost'  }
    ],
    methods: {
      onWin: function() { console.log('You win'); },
      onLost: function() { console.log('You lost'); },
    }
  });
  
  this.checkCode = function (code) {
    var match_positions = [];    
    var code_numbers = code.split('').map(function(item) {
      return parseInt(item, 10);
    });
    
    for(var i=0; i < code_numbers.length; i++) {
      if (code_numbers[i] == this.secret_code[i]) {
        match_positions.push(PROPER_POSITION);
      } else if(this.secret_code.includes(code_numbers[i])) {
        match_positions.push(WRONG_POSITION);
      }
    }
    return match_positions;
  };

  this.checkState = function(code) {
    if(this.attempt_count == 0) {
      this.fsm.lost();
    } else if(this.secret_code.join("") == code) {
      this.fsm.win();
    }
  };
};

CodeBreaker.prototype.match_guess = function (code) {
  this.attempt_count -= 1;
  this.checkState(code);
  matched = this.checkCode(code);
  return matched.join('');
};

CodeBreaker.prototype.hint = function () {
  this.hint_count -= 1;
  
  if(this.hint_count >= 0) {
    var rand_index = Math.floor(Math.random() * 6) + 1;
    return this.secret_code[rand_index];
  } else {
    console.info('No hints');
    return false;
  }
};

CodeBreaker.prototype.getState = function () {
  return this.fsm.state;
};

module.exports = CodeBreaker;