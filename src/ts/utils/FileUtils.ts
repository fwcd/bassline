import * as fs from "fs";
import * as path from "path";

/**
 * Asynchronously walks the file tree starting at
 * the given directory.
 */
export function walkFileTree(directory: string, each: (filePath: string) => void): void {
	fs.readdir(directory, (error, files) => {
		files.forEach(fileName => {
			let filePath = path.resolve(directory, fileName);
			fs.stat(fileName, (error, stats) => {
				if (stats && stats.isDirectory()) {
					// Directory = recursively search through it's contents
					walkFileTree(filePath, each);
				} else {
					// File = return through callback
					each(filePath);
				}
			});
		});
	});
}
