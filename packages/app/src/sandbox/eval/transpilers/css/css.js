import postcss from 'postcss';
import cssnext from 'postcss-cssnext';
import postcssModules from 'postcss-modules';

/**
 * Take a map of classes and return the text of a `.d.ts` file which describes those class names
 * @param classes A map of classes
 */
function classesToDefinition(classes) {
  return Object.keys(classes)
    .reduce((previous, className) => previous + `export const ${className}: string;\n`, '');
}

/**
 * Take a map of classes and return an AMD module which returns an object of those class names
 * @param classes A map of classes
 * @param key A string which will be the key for the object map
 */
function classesToAMD(classes, key) {
  const result = Object.keys(classes)
    .map((className) => `\t'${className}': '${classes[className]}'`);
  result.push(`\t' _key': '${key}'`);

  return `define([], function () {
    return {
    ${result.join(',\n')}
    };
  });\n`;
}

/**
 * Generate definition files for CSS Modules.
 *
 * This function takes a CSS Module, generates the modularised class names and then returns a `.d.ts` file
 * that contains the source class names which can be used to import the CSS Module into a TypeScript module.
 * @param files Project files to generate definitions for.
 */
export async function getDefinitions(...files) {

  let mappedClasses;
  function getJSON(filename, json) {
    mappedClasses = json;
  }

  const processor = postcss([
    postcssModules({ getJSON })
  ]);

  const definitionFiles = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    mappedClasses = undefined;
    await processor.process(file.text); // eslint-disable-line no-await-in-loop
    if (mappedClasses) {
      definitionFiles.push({
        name: file.name + '.d.ts',
        text: classesToDefinition(mappedClasses),
        type: 'definition'
      });
    }
  }
  return definitionFiles;
}

/**
 * Emit transpiled CSS Modules.
 *
 * This function takes in any number of project files and resolves with an array of emitted files which will contain two files
 * for each CSS module, a AMD module which returns a map of class names which have been localised and a CSS file which contains
 * the localised CSS.
 * @param files Project files to generate emitted CSS for.
 */
export async function getEmit(...files) {

  let mappedClasses;
  function getJSON(filename, json) {
    mappedClasses = json;
  }

  const processor = postcss([
    cssnext({
      features: {
        autoprefixer: {
          browsers: [ 'last 2 versions', 'ie >= 11' ]
        }
      }
    }),
    postcssModules({ getJSON })
  ]);

  const emitFiles = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    mappedClasses = undefined;
    const result = await processor.process(`/* from: ${file.name} */\n\n` + file.text, { // eslint-disable-line no-await-in-loop
      from: file.name,
      map: {
        sourcesContent: true
      }
    });

    /* add emitted css text */
    emitFiles.push({
      name: file.name,
      text: result.css,
      type: 'css'
    });

    if (mappedClasses) {
      /* get the basename and strip the extension to be used as the key for the localised CSS */
      const key = file.name.split('/').pop().replace(/(\.m)?\.css$/, '');
      emitFiles.push({
        name: file.name + '.js',
        text: classesToAMD(mappedClasses, key),
        type: 'javascript'
      });
    }
  }
  return emitFiles;
}
