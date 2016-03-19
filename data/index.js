"use strict";

var fs = require("fs");
var path = require("path");

module.exports = {
	getFolderContents: getFolderContents,
	getMetadata: getMetadata,
};

function getFolderContents(directory)
{
	return new Promise(function(resolve, reject)
	{
		fs.readdir(directory, function(err, files)
		{
			if (err)
			{
				reject(err);
				return;
			}

			var folder = {
				files: [],
				folders: []
			};
			files.forEach(function(file)
			{
				fs.stat(path.join(directory, file), function(err, stats)
				{
					if (err)
					{
						reject(err);
						return;
					}

					if (stats.isDirectory())
					{
						folder.folders.push(path.join(directory, file));
					}
					if (stats.isFile())
					{
						folder.files.push(path.join(directory, file));
					}
				});
			});

			resolve(folder);
		});
	})
}

function getFolderContentsWithFilter(directory, filter)
{
	return new Promise(resolve, reject)
	{
		// filter is an object with terms
		// tag1 AND tag2 AND (tag3 OR tag4)
		var exampleFilter = {
			_operator: "AND",
			terms: [
				"tag1", 
				"tag2",
				{
					_operator: "OR",
					terms: [
						"tag3",
						"tag4"
					]
				}
			]
		}

		var whereClause = makeWhereClauseFromFilter(filter)

		// Make SQL query and call DB
		// Consider using an ORM?


		// Build folder, having list of file paths, from returned records
		var folder = {
			files: []
		};
		resolve(folder);
	};
}

function getMetadata(filePath)
{
	return new Promise(resolve, reject)
	{
		// Do something actual, but for now, just resolve with fake data
		resolve({});
	}
}

function makeWhereClauseFromFilter(filter)
{
	// An ORM might make this function unnecessary
	return "";
}