const path = require('path');
const fs = require('fs');


/**
 * Go throw all files in directory and subdirectories
 *
 * @param {string} directory
 * @param {function(pathToFile: string)} readFile
 */
const readAllFiles = (directory, readFile) => {

	fs.readdir(directory, function (err, files) {
		//handling error
		if (err) {
			return console.log('ERROR! Unable to scan directory: ' + err);
		}

		//listing all files using forEach
		files.forEach(function (file) {

			// if folder
			if (!file.includes(".")) {
				readAllFiles(path.join(directory, file), readFile)
			}
			// if file
			else {
				readFile(path.join(directory, file));
			}
		});
	});

}


// MAIN

const directory = process.argv[2];

if (!directory) {
	return console.log("ERROR! Path to directory was expected");
}

const directoryPath = path.isAbsolute(directory) ? directory : path.join(__dirname, directory);

readAllFiles(directoryPath, pathToFile => {

	try {
		let text = fs.readFileSync(pathToFile).toString();

		for (let i = 400; i > 1; i -= 2) {
			console.log(new RegExp(`(?<![0-9])${i}px`, "g"));
			text = text.replace(new RegExp(`(?<!\d)${i}px`, "g"), `${i / 16}rem`)
		}

		fs.writeFile(pathToFile, text, (err) => {
			if (err) {
				return console.log("ERROR! " + err);
			}
		});
	}
	catch (err) {

		if (err) {
			return console.log('ERROR! Unable to handle file: ' + err);
		}
	}

})
