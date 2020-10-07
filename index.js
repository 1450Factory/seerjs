#!/usr/bin/env node

const { Command } = require('commander');
const ora = require('ora');
const git = require("simple-git");
const { spawn, exec } = require("child_process");
const colors = require('colors');

const program = new Command();

program
  .command('new <name> [destination]')
  .description('Creating a new Nodejs application')
  .action((name, destination) => {
    let language = (program.typescript) ? 'typescript' : 'javascript';

    if (program.debug) {
      console.log('output extra debugging', program.opts());
    }

    if (destination === undefined) {
      destination = '.'
    }

    if (destination.endsWith('/')) {
      destination = destination.slice(0, -1);
    }
    const spinner = ora('Creating project... \r\n').start();
    spinner.color = 'blue';

    const remote = `https://github.com/1450Factory/express-${language}-starter.git`;

    name = name.toLowerCase().replace(' ', '_');

    git().silent(true)
      .clone(remote, `${destination}/${name}`)
      .then(() => {
        console.log(colors.bgGreen.white('  Project created sucessfully!  \r\n'));

        spinner.color = 'green';
        spinner.text = 'Installing the project... \r\n';

        exec(`npm --prefix ${destination}/${name} install ${destination}/${name}`, (err, stdout, stderr) => {
          if (err) {
            spinner.stop();
            console.log(colors.bgRed.white('  There is an error during the installation!  \r\n'));
            console.log(err);
            return;
          }

          spinner.stop();
          console.log(colors.bgGreen.white('  Project installed sucessfully!  \r\n'));
        });
      })
      .catch((err) => {
        console.error('failed: ', err)
        spinner.stop();
      });
  });

program
  .version('0.0.1', '-v, --version', 'output the current version')
  .description("Craftsman is a command line help you to speed up your node projects development.")
  .option('-d, --debug', 'output extra debugging')
  .option('-js, --javascript', 'Use javascript (default)')
  .option('-js, --typescript', 'Use typescript')
  ;

program.parse(process.argv);
