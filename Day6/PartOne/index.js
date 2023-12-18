import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function partOne(filePath) {
	const absolutePath = `${__dirname}/${filePath}`;
	const lines = fs.readFileSync(absolutePath, "utf-8").trim().split("\r\n");
	const [times, distances] = lines.map((line) =>
		line
			.split(":")[1]
			.trim()
			.split(" ")
			.filter((v) => v != "")
			.map((v) => Number(v))
	);

	let product = 1;

	times.map((time, i) => {
		const windCondition = distances[i];
		let winCounts = 0;
		let startP = 0;
		let endP = time;

		while (startP <= endP) {
			if (endP * startP > windCondition) {
				console.log(startP * endP, windCondition);
				winCounts++;
			}

			endP--;
			startP++;
		}
		winCounts *= 2;

		if (time % 2 == 0) {
			winCounts--;
		}
		console.log(winCounts);
		product *= winCounts;
	});

	return product;
}

console.log(partOne("./input.txt"));
