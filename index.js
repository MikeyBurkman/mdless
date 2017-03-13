#!/usr/bin/env node
'use strict';

var path = require('path');
var fs = require('fs');
var marked = require('marked');
var pager = require('node-pager');
var TerminalRenderer = require('marked-terminal');

var fileName = process.argv[2];

if (!fileName) {
    console.error('Error: Must provide a file as the first argument');
    process.exit(1);
}

var fileString = fs.readFileSync(path.resolve(fileName), 'utf8')

marked.setOptions({
  renderer: new TerminalRenderer()
});
var markedUp = marked(fileString);

pager(markedUp);