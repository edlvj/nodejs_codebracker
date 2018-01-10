const readline = require('readline'); 
const Codebreaker = require('../codebreaker');
const Statistic = require('../codebreaker/statistic');

var Cli = function () {
  this.stat = new Statistic();

  this.play = function () {
    console.log("Enter 'h' for get hint. And 'q' for exit from a game.");
    this.rl.prompt();
    
    this.rl.on('line', (line) => {
      switch (line) {
        case 'h':
          console.log(this.cb.hint());
          break;
        case 'q':
          process.exit(0);
          break;
        default:
          if(!/(^([1-6]{4})$)/.test(line)) {
            console.info('Code is invalid');
            break;
          } 
          console.log(this.cb.match_guess(line));
          
          if(this.cb.getState() == ('win' || 'lost')) {
            this.rl.close();
            this.start();
          }
          break;
      }
    });
  }
};

Cli.prototype.start = function () {
  this.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'command> '
  });;
  
  this.rl.question('Do you wanna start new game?(Y/N):', (answer) => {
    if(answer == 'Y') {
      this.cb = new Codebreaker();
      this.play();
    } else {
      process.exit(0);
    }
  });
};

Cli.prototype.save_result = function () {
  this.rl.question('Enter your username:', (username) => {
    this.stat.save(username, this.cb.attempt_count);
  });  
};

Cli.prototype.show_result = function () {
  this.stat.show(function(data){
    console.log(data);
  }); 
};

module.exports = Cli;