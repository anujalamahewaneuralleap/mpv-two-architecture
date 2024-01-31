const fs = require('fs');
const path = require('path');

const loadDefinitions = (dir) => {
    const definitions = {};
    const load = (dir) => {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                load(fullPath); // Recursively load definitions in subdirectories
            } else if (file !== 'index.js' && file.endsWith('.js')) {
                const def = require(fullPath);
                definitions[def.name] = def;
            }
        });
    };
    load(dir);
    return definitions;
};

module.exports = loadDefinitions;
