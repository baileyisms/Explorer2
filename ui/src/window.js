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
	}
})()