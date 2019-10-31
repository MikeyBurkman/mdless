#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');

const marked = require('marked');
const pager = require('node-pager');
const TerminalRenderer = require('marked-terminal');
const stdin = require('get-stdin');

const fileName = process.argv[2];

if (!fileName && process.stdin.isTTY) {
  console.error('Error: Must provide a file as the first argument');
  process.exit(1);
}

if (fileName) {
  const fileString = fs.readFileSync(path.resolve(fileName), 'utf8');
  render(fileString);
} else {
  stdin().then(render);
}

function render(s) {
  marked.setOptions({
    renderer: new TerminalRenderer()
  });
  const markedUp = marked(s);

  pager(markedUp);
}
