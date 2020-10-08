const Handlebars = require("handlebars");
const fs = require('fs');
const path = require('path');

Handlebars.registerHelper('toUpperCase', function (string) {
  return string.toUpperCase()
})

Handlebars.registerHelper('toLowerCase', function (string) {
  return string.toLowerCase()
})

Handlebars.registerHelper("firstToUpperCase", function (options) {
  return string.charAt(0).toUpperCase() + string.slice(1);
});

Handlebars.registerHelper("firstToLowerCase", function (options) {
  return string.charAt(0).toUpperCase() + string.slice(1);
});

Handlebars.registerHelper('toCamelCase', function (string) {
  return string
    .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
    .replace(/\s/g, '')
    .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
})

Handlebars.registerHelper('toSnakeCase', function (string) {
  return string.replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_');
})


module.exports.toTitleCase = (string) => {
  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

module.exports.createFile = (filename, type, language, destination, options = {}) => {
  language = (language === 'typescript') ? 'ts' : 'js';

  if (destination === undefined) {
    destination = '.'
  }

  mkdirp(`${destination}/app/${type}s`);

  let source = fs.readFileSync(`./src/templates/${type}.${language}.tpl`);
  let template = Handlebars.compile(source.toString());
  let output = template({ name: filename, fields: options.fields });

  try {
    fs.writeFileSync(`${destination}/app/${type}s/${filename}.${language}`, output, "UTF-8");
  } catch (error) {
    console.error(error);
  }
};

mkdirp = (dir) => {
  if (fs.existsSync(dir)) {
    return true
  }

  const dirname = path.dirname(dir)

  mkdirp(dirname);

  fs.mkdirSync(dir);
}
