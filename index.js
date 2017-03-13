
var fs = require('fs');
var marked = require('marked');
var pager = require('node-pager');
var TerminalRenderer = require('marked-terminal');

var fileName = process.argv[2];

if (!fileName) {
    console.error('Error: Must provide a file as the first argument');
    process.exit(1);
}

marked.setOptions({
  renderer: new TerminalRenderer()
});
var markedUp = marked(fs.readFileSync(fileName, 'utf8'));

pager(markedUp);