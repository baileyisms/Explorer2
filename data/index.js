"use strict";

var fs = require("fs");
var path = require("path");

// Might consider exporting a method that doesn't take a directory. 
// Keeping track of the current directory might be a responsibility best owned by the data layer.
function getFolderContents(directory)
{
	fs.readdir(directory, function(err, files)
	{
		if (err)
		{
			console.error(err);
			return null;
		}
		else
		{
			var folder = {
				files: [],
				folders: []
			};
			files.forEach(function(file)
			{
				fs.stat(path.join(directory, file), function(err, stats)
				{
					if (stats.isDirectory())
					{
						folder.folders.push({
							path: path.join(directory, file),
							isFolder: true
						});
					}
					if (stats.isFile())
					{
						folder.files.push({
							path: path.join(directory, file),
							isFolder: false
						});
					}
				});
			});

			return folder;
		}
	});
}

exports.getFolderContents = getFolderContents;