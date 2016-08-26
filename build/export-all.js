#! env node
'use strict';
// libraries
const { readFile, readdir, writeFile } = require('fs');
// constants
const DIR = __dirname + '/../src/';
const TEMPLATE = __dirname + '/index.template.js';
// define placeholder on template
const importPlaceholder = `//--import`;
const exportPlaceholder = `//--export`;
// start dynamic generation
readFile(
    TEMPLATE,
    (err, template) => {
        // check for errors
        if (err) return console.error(err, err.stack);
        // define template
        template = template.toString();
        readdir(
            DIR,
            (err, names) => {
                // check for errors
                if (err) {
                    return console.error(err, err.stack);
                }
                // redure names
                names = names.reduce(
                    (r, n) => n.indexOf('.vue') > -1 && r.push(n) && r || r, []
                )
                // define all rows
                const importRows = names.map(
                    file => `import ${file.replace('.vue', '')} from './${file.replace('.vue', '')}'`
                );
                const exportRows = names.map(
                    file => `\t${file.replace('.vue', '')}`
                );
                // inject rows in template
                template = template.replace(importPlaceholder, importRows.join('\n'));
                template = template.replace(exportPlaceholder, exportRows.join(',\n'));
                // increment counter
                // check countr status and write file when is time
                writeFile(
                    DIR + './index.js',
                    template,
                    'utf8',
                    (err) => {
                        // check for errors
                        if (err) return console.error(err, err.stack);
                        console.log('Done');
                    }
                );
            }
        )
    }
);
