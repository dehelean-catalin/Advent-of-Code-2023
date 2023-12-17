import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function partOne(filePath) {
	const absolutePath = `${__dirname}/${filePath}`;
	const lines = fs.readFileSync(absolutePath, "utf-8").trim().split("\r\n");
	const schematicEngine = convertToMatrix(lines);
	let engineSum = 0;
	let keepEngine = false;

	for (let i = 0; i < schematicEngine.length; i++) {
		let enginePart = "";
		for (let j = 0; j < schematicEngine[i].length; j++) {
			let piece = schematicEngine[i][j];

			if (!isNaN(Number(piece))) {
				enginePart += piece;
				if (hasAdjacencySymbol(schematicEngine, i, j)) {
					keepEngine = true;
				}
			} else if (enginePart.length > 0) {
				if (keepEngine) {
					engineSum += Number(enginePart);
				}
				enginePart = "";
				keepEngine = false;
			}
		}

		if (enginePart.length > 0 && keepEngine) {
			engineSum += Number(enginePart);
			enginePart = "";
		}

		keepEngine = false;
	}
	return engineSum;
}

console.log(partOne("./input.txt"));

function convertToMatrix(lines) {
	const schematic = [];

	lines.map((line, i) => {
		schematic.push([]);
		const characters = line.split("");

		characters.map((char) => {
			schematic[i].push(char);
		});
	});

	return schematic;
}

function hasAdjacencySymbol(enginePart, i, j) {
	const endColumnIndex = enginePart[i].length - 1;
	const endRowIndex = enginePart.length - 1;

	if (j > 0 && isSymbol(enginePart[i][j - 1])) return true;
	if (i > 0 && isSymbol(enginePart[i - 1][j])) return true;
	if (j < endColumnIndex && isSymbol(enginePart[i][j + 1])) return true;
	if (i < endRowIndex && isSymbol(enginePart[i + 1][j])) return true;

	if (i > 0 && j > 0 && isSymbol(enginePart[i - 1][j - 1])) {
		return true;
	} //left up

	if (i > 0 && j < endColumnIndex && isSymbol(enginePart[i - 1][j + 1])) {
		return true;
	} // right-up

	if (i < endRowIndex && j > 0 && isSymbol(enginePart[i + 1][j - 1])) {
		return true;
	} //left-down

	if (
		i < endRowIndex &&
		j < endColumnIndex &&
		isSymbol(enginePart[i + 1][j + 1])
	)
		return true;
	//right-down

	return false;
}

function isSymbol(piece) {
	return isNaN(piece) && piece != ".";
}
