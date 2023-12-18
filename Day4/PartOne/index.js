import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function partOne(filePath) {
	const absolutePath = `${__dirname}/${filePath}`;
	const lines = fs.readFileSync(absolutePath, "utf-8").trim().split("\r\n");
	let result = 0;

	lines.map((line) => {
		let winningCount = 0;
		const [winningNumbers, numbers] = line
			.split(":")[1]
			.trim()
			.split("|")
			.map((v) =>
				v
					.trim()
					.split(" ")
					.filter((v) => v != "")
			);

		winningNumbers.map((winningNumber) => {
			if (numbers.includes(winningNumber)) {
				winningCount++;
			}
		});

		if (winningCount > 0) {
			result += 2 ** Number(winningCount - 1);
		}
	});

	return result;
}

console.log(partOne("./input.txt"));
