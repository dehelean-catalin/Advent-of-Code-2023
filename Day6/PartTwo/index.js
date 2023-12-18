import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function partOne(filePath) {
	const absolutePath = `${__dirname}/${filePath}`;
	const lines = fs.readFileSync(absolutePath, "utf-8").trim().split("\r\n");
	const [time, distance] = lines.map((line) =>
		line
			.split(":")[1]
			.trim()
			.split(" ")
			.filter((v) => v != "")
			.reduce((a, b) => a + b)
	);
	let product = 1;

	const winCondition = Number(distance);
	let startP = 0;
	let endP = Number(time);

	while (endP * startP <= winCondition) {
		endP--;
		startP++;
	}
	product = endP - startP + 1;

	console.log(startP, endP, winCondition);

	return product;
}

console.log(partOne("./input.txt"));
