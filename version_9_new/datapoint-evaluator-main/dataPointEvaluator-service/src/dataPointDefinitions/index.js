const fs = require('fs');
const path = require('path');

const definitions = {};

const loadDefinitions = (dir) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            loadDefinitions(fullPath); // Recursively load definitions in subdirectories
        } else if (file !== 'index.js' && file.endsWith('.js')) {
            const def = require(fullPath);
            definitions[def.name] = def;
        }
    });
};

loadDefinitions(__dirname);

module.exports = definitions;
