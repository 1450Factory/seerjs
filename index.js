#!/usr/bin/env node

const { Command } = require('commander');
const ora = require('ora');
const git = require("simple-git");
const { spawn, exec } = require("child_process");
const colors = require('colors');
const inquirer = require("inquirer");
const { toTitleCase, createFile } = require("./helpers");

const program = new Command();

program
  .command('new <name> [destination]')
  .description('Creating a new Nodejs application')
  .action((name, destination) => {
    let language = (program.typescript) ? 'typescript' : 'javascript';
    let spinner = ora('Creating project... \r\n').start();
    spinner.color = 'blue';

    if (program.debug) {
      console.log('output extra debugging', program.opts());
    }

    if (destination === undefined) {
      destination = '.'
    }

    if (destination.endsWith('/')) {
      destination = destination.slice(0, -1);
    }

    name = name.toLowerCase().replace(/ /g, '_');

    git()
      .silent(true)
      .clone(`https://github.com/1450Factory/express-${language}-starter.git`, `${destination}/${name}`)
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
  .command('make:model <name> [destination]')
  // .option('-r, --recursive', 'Remove recursively')
  .description('Make a model file')
  .action((name, destination) => {
    // let types = ["model", "controller", "route", "reposiroty", "service"];
    let language = (program.typescript) ? 'typescript' : 'javascript';

    if (program.debug) {
      console.log('output extra debugging', program.opts());
    }

    if (destination === undefined) {
      destination = './'
    }

    if (destination.endsWith('/')) {
      destination = destination.slice(0, -1);
    }

    name = toTitleCase(name);

    let fields = [];

    console.log(colors.bgWhite.black('  Feed your model  \r\n'));

    const askQuestion = async () => {
      let mongoTypes = ['String', 'Number', 'Date', 'Boolean', 'ObjectId', 'Array'];

      inquirer
        .prompt([
          {
            type: "input",
            name: `name`,
            message: `${"Field name (lowercase) : "}\r\n`,
            default: "",
            validate: function (input) { /* Legacy way: with this.async */
              // Declare function as asynchronous, and save the done callback
              let done = this.async();


              if (!/^[A-Za-z]*/.test(input)) {
                // Pass the return value in the done callback
                done('Model name need to start with a letter A-Z');
                return;
              }

              // Pass the return value in the done callback
              done(null, true);
            }
          },

          {
            type: "input",
            name: `type`,
            message: `${"Field type (Accepted types [String|Number|Date|Boolean|ObjectId|Array] | Default type is [String]): "}\r\n`,
            default: `String`,
            validate: function (input) { /* Legacy way: with this.async */
              // Declare function as asynchronous, and save the done callback
              let done = this.async();

              if (!mongoTypes.includes(input)) {
                // Pass the return value in the done callback
                done('Accepted types are String|Number|Date|Boolean|ObjectId|Array');
                return;
              }

              // Pass the return value in the done callback
              done(null, true);
            }
          }
        ])
        .then((answer) => {
          fields.push(answer);

          if (answer.name != "") {
            askQuestion();
          } else {
            createFile(name, 'model', language, destination, { fields });

            console.log(colors.bgGreen.white('  Model created sucessfully!  \r\n'));
          }
        })
        .catch(error => {
          if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
          } else {
            // Something else when wrong
          }
          console.log(colors.bgRed.white('  Error!  \r\n'));
          console.error(error);
        });
    };

    askQuestion();
  });


program
  .command('make:controller <name> [destination]')
  .description('Make a controller file')
  .action((name, destination) => {
    let language = (program.typescript) ? 'typescript' : 'javascript';

    if (program.debug) {
      console.log('output extra debugging', program.opts());
    }

    if (destination === undefined) {
      destination = './'
    }

    if (destination.endsWith('/')) {
      destination = destination.slice(0, -1);
    }

    name = toTitleCase(name);

    createFile(name, 'controller', language, destination);

    console.log(colors.bgGreen.white('  Controller created sucessfully!  \r\n'));
  });


program
  .command('make:route <name> [destination]')
  .description('Make a route file')
  .action((name, destination) => {
    let language = (program.typescript) ? 'typescript' : 'javascript';

    if (program.debug) {
      console.log('output extra debugging', program.opts());
    }

    if (destination === undefined) {
      destination = './'
    }

    if (destination.endsWith('/')) {
      destination = destination.slice(0, -1);
    }

    name = toTitleCase(name);

    createFile(name, 'route', language, destination);

    console.log(colors.bgGreen.white('  Route created sucessfully!  \r\n'));
  });


program
  .command('make:crud <name> [destination]')
  .description('Make a route file')
  .action((name, destination) => {
    let language = (program.typescript) ? 'typescript' : 'javascript';

    if (program.debug) {
      console.log('output extra debugging', program.opts());
    }

    if (destination === undefined) {
      destination = './'
    }

    if (destination.endsWith('/')) {
      destination = destination.slice(0, -1);
    }

    name = toTitleCase(name);

    let fields = [];

    console.log(colors.bgWhite.black('  Feed your model  \r\n'));

    const askQuestion = async () => {
      let mongoTypes = ['String', 'Number', 'Date', 'Boolean', 'ObjectId', 'Array'];

      inquirer
        .prompt([
          {
            type: "input",
            name: `name`,
            message: `${"Field name (lowercase) : "}\r\n`,
            default: "",
            validate: function (input) { /* Legacy way: with this.async */
              // Declare function as asynchronous, and save the done callback
              let done = this.async();


              if (!/^[A-Za-z]*/.test(input)) {
                // Pass the return value in the done callback
                done('Model name need to start with a letter A-Z');
                return;
              }

              // Pass the return value in the done callback
              done(null, true);
            }
          },

          {
            type: "input",
            name: `type`,
            message: `${"Field type (Accepted types [String|Number|Date|Boolean|ObjectId|Array] | Default type is [String]): "}\r\n`,
            default: `String`,
            validate: function (input) { /* Legacy way: with this.async */
              // Declare function as asynchronous, and save the done callback
              let done = this.async();

              if (!mongoTypes.includes(input)) {
                // Pass the return value in the done callback
                done('Accepted types are String|Number|Date|Boolean|ObjectId|Array');
                return;
              }

              // Pass the return value in the done callback
              done(null, true);
            }
          }
        ])
        .then((answer) => {
          fields.push(answer);

          if (answer.name != "") {
            askQuestion();
          } else {
            createFile(name, 'model', language, destination, { fields });

            console.log(colors.bgGreen.white('  Model created sucessfully!  \r\n'));

            createFile(name, 'controller', language, destination);

            console.log(colors.bgGreen.white('  Controller created sucessfully!  \r\n'));

            createFile(name, 'route', language, destination);

            console.log(colors.bgGreen.white('  Route created sucessfully!  \r\n'));
          }
        })
        .catch(error => {
          if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
          } else {
            // Something else when wrong
          }
          console.log(colors.bgRed.white('  Error!  \r\n'));
          console.error(error);
        });
    };

    askQuestion();

    console.log(colors.bgGreen.white('  CRUD created sucessfully!  \r\n'));
  });


program
  .version('0.0.1', '-v, --version', 'output the current version')
  .description("Craftsman is a command line help you to speed up your node projects development.")
  .option('-d, --debug', 'output extra debugging')
  .option('-js, --javascript', 'Use javascript (default)')
  .option('-ts, --typescript', 'Use typescript')
  ;

program.parse(process.argv);
