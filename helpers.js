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

Handlebars.registerHelper('toPascalCase', function (string) {
  return string.replace(/(\w)(\w*)/g, function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
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

module.exports.createFile = (name, type, language, destination, options = {}) => {
  const filename = camelize(name);
  const templatesPath = path.join(__dirname,
    (language === 'typescript') ? '/src/templates/ts' : '/src/templates'
  );
  language = (language === 'typescript') ? 'ts' : 'js';

  if (destination === undefined) {
    destination = '.'
  }

  mkdirp(`${destination}/app/${type}s`);

  let source = fs.readFileSync(`${templatesPath}/${type}.${language}.tpl`);
  let template = Handlebars.compile(source.toString());
  let output = template({ name: filename, fields: options.fields });

  try {
    fs.writeFileSync(`${destination}/app/${type}s/${filename}s.${type}.${language}`, output, "UTF-8");
  } catch (error) {
    console.error(error);
  }

  if (type === 'route' && language === 'js') {
    fs.readFile(`${destination}/app/routes/index.js`, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }

      const result = data
        .replace(/module.exports = router/g, `router.use(\'/${filename}s\', isAuthenticated, require(\'./${filename}s\'));\r\n\r\nmodule.exports = router\r\n`);

      fs.writeFile(`${destination}/app/routes/index.js`, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  } else if (type === 'route' && language === 'ts') {
    fs.readFile(`${destination}/app/routes/index.ts`, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }

      const result = data
        .replace(/const router = express.Router\(\)/g, `import ${filename}sRoutes from './${filename}s.route';\r\n\r\nconst router = express.Router()`)
        .replace(/export = router/g, `router.use(\'/${filename}s\', isAuthenticated(), ${filename}sRoutes);\r\n\r\nexport = router`);

      fs.writeFile(`${destination}/app/routes/index.ts`, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
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

function camelize (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
