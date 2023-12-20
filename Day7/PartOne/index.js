import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const MAP_VALS = {
	A: "Z",
	K: "Y",
	Q: "X",
	J: "W",
	T: "V",
};

const MAP_POINTS = {
	5: {
		point: 1,
		name: "High Card",
	},
	4: { point: 2, name: "One pair" },
	1: { point: 7, name: "Five of a kind" },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function partOne(filePath) {
	const absolutePath = `${__dirname}/${filePath}`;
	const lines = fs.readFileSync(absolutePath, "utf-8").trim().split("\r\n");

	const ranks = [];

	lines.map((line) => {
		const hand = line.split(" ")[0];
		const bet = line.split(" ")[1];
		const counts = {};
		let numHand = "";

		for (const card of hand) {
			if (MAP_VALS[card]) {
				numHand += MAP_VALS[card];
			} else {
				numHand += card;
			}

			if (counts[card]) {
				counts[card]++;
			} else {
				counts[card] = 1;
			}
		}

		const keyLen = Object.keys(counts).length;

		if (MAP_POINTS[keyLen]) {
			ranks.push({ numHand, bet, ...MAP_POINTS[keyLen] });
		} else if (keyLen == 3) {
			if (Object.values(counts).includes(3)) {
				ranks.push({ numHand, point: 4, name: "Three of a kind", bet });
			} else {
				ranks.push({ numHand, point: 3, name: "Two pair", bet });
			}
		} else if (keyLen == 2) {
			if (Object.values(counts).includes(4)) {
				ranks.push({ numHand, point: 6, name: "Four of a kind", bet });
			} else {
				ranks.push({ numHand, point: 5, name: "Full house", bet });
			}
		}
	});

	ranks.sort((a, b) => {
		if (a.point == b.point) {
			return a.numHand.localeCompare(b.numHand);
		} else {
			return a.point - b.point;
		}
	});

	return ranks.reduce((acm, val, index) => {
		console.log(val.numHand, val.point, val.name);
		return acm + Number(val.bet) * (index + 1);
	}, 0);
}

console.log(partOne("./input.txt"));
