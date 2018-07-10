#!/usr/bin/env node

const sade = require('sade');
const prog = sade('ralm');
const chalk = require('chalk');
const prompts = require('prompts');
const request = require('request');

// Code chunk pulled straight from notifier github page {start}
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

// Checks for available update and returns an instance
const notifier = updateNotifier({pkg});

// Notify using the built-in convenience method
notifier.notify();
// Code chunk pulled straight from notifier github page {end}

if (notifier.update) {
  console.log(`Update available: ${notifier.update.latest}`);
}

const consoleWidth = () => {
  return parseInt(process.stdout.columns);
};

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
