"use strict";
var handlebars = require("handlebars");
var fs = require("fs");
var path = require("path");

var config = require('./config.js');

var HTMLPath = path.join(__dirname, "./ui/templates/index.html");

var template = handlebars.compile(fs.readFileSync(HTMLPath, "utf8"));

var render = template({
 	assets: config.get('/appAssets')
});
fs.writeFileSync(path.join(__dirname, "./index.html"), render);