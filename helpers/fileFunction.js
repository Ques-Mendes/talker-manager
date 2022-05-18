const fs = require('fs');

function readTalker() {
 return JSON.parse(fs.readFileSync('talker.json', 'utf8'));
}

module.exports = readTalker;