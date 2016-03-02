"use strict";
let handlebars = require("handlebars");
let fs = require("fs");
let path = require("path");

var config = require('./config.js');

let HTMLPath = path.join(__dirname, "./ui/templates/index.html");

let template = handlebars.compile(fs.readFileSync(HTMLPath, "utf8"));

let render = template({
 	assets: config.get('/appAssets')
});
fs.writeFileSync(path.join(__dirname, "./index.html"), render);