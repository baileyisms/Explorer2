"use strict";
var Confidence = require("confidence");
var _ = require("lodash");
var path = require("path");

var appAssetsPath = "./ui/app-assets.json";
var appAssets = require(appAssetsPath);
appAssets.directory = path.dirname(appAssetsPath);

function separateCssAndJs(collection)
{
	var css = [];
	var js = [];
	collection.forEach(function(element)
	{
		// This step should be separated into its own function...
		element = path.join(collection.directory, element);

		var extension = element.slice(element.lastIndexOf(".") + 1);
		if (extension === "css")
		{
			css.push(element);
		}
		if (extension === "js")
		{
			js.push(element);
		}
	});

	return {
		css: css,
		js: js
	};
}

var configurationObject = {
	secrets: require("./config.json"),
	appAssets:
	{
		$filter: "env",
		development: separateCssAndJs(appAssets),
		test: separateCssAndJs(appAssets),
		production: separateCssAndJs(appAssets)
	}
};

var store = new Confidence.Store(configurationObject);

var criteria = {
	env: (process.env.ENVIRONMENT || "development")
};

exports.environment = criteria;

exports.get = function(key)
{
	return store.get(key, criteria);
};