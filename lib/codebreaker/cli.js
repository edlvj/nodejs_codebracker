const Codebreaker = require('../lib/codebreaker');
const Statistic = require('../lib/codebreaker/statistic');
var program = require('commander');

var cb = new Codebreaker();
var stat = new Statistic();

program
  .version('0.0.1')
  .description('Codebreaker');

program
  .command('guess <code>')
  .alias('g')
  .description('Guess Code')
  .action((code) => {
  	if(!code.match(/(^([1-6]{4})$)/))
      console.info('Code is invalid');

    cb.checkState(code);

    switch (cb.getState()) {
		  case 'win':
		    console.log('save your score with "set-score <username>"');
        //start new game
		    break;
		  case 'lost':
		    //start new game
		    break;
		  default:
		    console.log(cb.match_guess(code));
		}
  });

program
  .command('hint')
  .alias('h')
  .description('Hint')
  .action(() => {
    cb.hint();
  });

program
  .command('score')
  .alias('s')
  .description('Score')
  .action(() => {
    stat.show();
  });

program
  .command('set-score <username>')
  .alias('ss')
  .description('Save Score')
  .action((username) => {
    stat.save(username, cb.attempt_count);
  });

program
  .command('exit')
  .alias('e')
  .description('Exit')
  .action(() => {
    process.exit(1);
  });