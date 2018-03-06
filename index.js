#!/usr/bin/env node

const sade = require('sade');
const prog = sade('ralm');
const chalk = require('chalk');
const prompts = require('prompts');
const request = require('request');

const consoleWidth = () => {
  return parseInt(process.stdout.columns);
};

// const printResults = (resList) => {
//   resList.forEach((result) => {
//     if (typeof (result.definition) !== undefined) {
//       console.log(chalk.bold.cyan('Word: ') + result.word);
//       console.log(chalk.bold.cyan('Definition: ') + result.definition);
//       console.log(chalk.bold.cyan('Score: ') + (result.thumbs_up - result.thumbs_down));
//       console.log(chalk.bold.green('Ayys: ') + result.thumbs_up + ' | ' + chalk.bold.red('Nayys: ') + result.thumbs_down);
//       console.log('='.repeat(consoleWidth()));
//     }
//   });
// };

prog
  .version('0.1.0')
  .option('-c, --config', 'Provide path to custom config', 'foo.config.js');

prog
  .command('build <src> <dest>')
  .describe('Build the source directory. Expects an `index.js` entry file.')
  .option('-o, --output', 'Change the name of the output file', 'bundle.js')
  .example('build src build --global --config my-conf.js')
  .example('build app public -o main.js')
  .action((src, dest, opts) => {
    console.log(`> building from ${src} to ${dest}`);
    console.log('> these are extra opts', opts);
  });

prog
  .command('prompt')
  .describe('Answer some questions. Expects your full attention.')
  .action(() => {
  	(async function(){
  		let response = await prompts({
	    type: 'text',
	    name: 'meaning',
	    message: 'What is the meaning of life?'
	  });
    	console.log(response.meaning);
  	})();
  })

prog.parse(process.argv);