(function()
{
	"use strict";

	angular.module("main").controller("MainController", MainController);

	MainController.$inject = [];

	function MainController()
	{
		var vm = this;
		vm.itemList = [];

		for (var i = 0; i < 200; i++)
		{
			vm.itemList.push("Apple" + i);
		}

		var path = require("path");
		var data = require(path.join(__dirname, "./data/index.js"));
		data.getFolderContents(__dirname);
	}
})()