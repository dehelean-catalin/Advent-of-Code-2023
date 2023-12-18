import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function partOne(filePath) {
	const absolutePath = `${__dirname}/${filePath}`;
	const lines = fs.readFileSync(absolutePath, "utf-8").trim().split("\r\n");
	const seeds = lines[0]
		.split(": ")[1]
		.split(" ")
		.map((seed) => Number(seed));
	let key = 0;
	const maps = {};

	for (let i = 2; i < lines.length; i++) {
		if (lines[i].includes("map")) {
			maps[key] = [];

			for (let j = i + 1; j < lines.length; j++) {
				if (lines[j] != "") {
					const [destination, source, range] = lines[j].split(" ");
					const numericRange = Number(range);
					const numDestination = Number(destination);
					const numSource = Number(source);

					let destinationEnd = numDestination + numericRange;
					let sourceEnd = numSource + numericRange;

					maps[key].push({
						destinationStart: numDestination,
						destinationEnd,
						sourceStart: numSource,
						sourceEnd,
					});
				} else {
					i = j;
					break;
				}
			}

			key++;
		}
	}

	let currCategory = seeds;

	for (const key in maps) {
		currCategory = convertToNextCategory(currCategory, maps, key);
	}

	return Math.min(...currCategory);
}

console.log(partOne("./examples.txt"));

function convertToNextCategory(values, maps, index) {
	const codes = [];
	for (const value of values) {
		let findMatch = false;
		for (const mp of maps[index]) {
			if (value >= mp.sourceStart && value < mp.sourceEnd) {
				codes.push(value + (mp.destinationStart - mp.sourceStart));
				findMatch = true;
			}
		}
		if (!findMatch) {
			codes.push(value);
		}
	}
	return codes;
}
