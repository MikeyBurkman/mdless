#!/usr/bin/env node
'use strict';

var path = require('path');
var fs = require('fs');

var marked = require('marked');
var pager = require('node-pager');
var TerminalRenderer = require('marked-terminal');
var stdin = require('get-stdin');

var fileName = process.argv[2];

if (!fileName && process.stdin.isTTY) {
    console.error('Error: Must provide a file as the first argument');
    process.exit(1);
}

if (fileName) {
    var fileString = fs.readFileSync(path.resolve(fileName), 'utf8');
    render(fileString);
} else {
    render(stdin());
}

function render(s) {
    marked.setOptions({
        renderer: new TerminalRenderer()
    });
    var markedUp = marked(s);

    pager(markedUp);
}
