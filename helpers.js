const ejs = require('ejs');
const fs = require('fs');

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

  if (!fs.existsSync(`${destination}`)) {
    fs.mkdirSync(`${destination}`);
  }

  let source = fs.readFileSync(`./src/templates/${type}.${language}.tpl`);
  let template = ejs.compile(source.toString());
  let result = template({ name: filename, fields: options.fields });

  try {
    fs.writeFileSync(`${destination}/${filename}.${language}`, result, "UTF-8");
  } catch (error) {
    console.error(error);
  }
};
