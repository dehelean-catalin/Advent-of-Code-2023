import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const MAP_VALS = {
	A: "Z",
	K: "Y",
	Q: "X",
	J: "1",
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

	const rankedHands = [];

	lines.map((line) => {
		const hand = line.split(" ")[0];
		const bet = line.split(" ")[1];

		const { newHand, numHand } = toStructuredHand(hand);
		const jokerHand = toJokerHand(newHand);

		const keyLen = Object.keys(jokerHand).length;
		const values = Object.values(jokerHand);

		getHandType(keyLen, values, (type) =>
			rankedHands.push({ numHand, bet, ...type })
		);
	});

	handsSort(rankedHands);

	return rankedHands.reduce((acm, val, index) => {
		return acm + Number(val.bet) * (index + 1);
	}, 0);
}

console.log(partOne("./input.txt"));

function handsSort(rankedHands) {
	rankedHands.sort((a, b) => {
		if (a.point == b.point) {
			return a.numHand.localeCompare(b.numHand);
		} else {
			return a.point - b.point;
		}
	});
}

function toStructuredHand(hand) {
	const newHand = {};
	let numHand = "";

	for (const card of hand) {
		if (MAP_VALS[card]) {
			numHand += MAP_VALS[card];
		} else {
			numHand += card;
		}

		if (newHand[card]) {
			newHand[card]++;
		} else {
			newHand[card] = 1;
		}
	}
	return { newHand, numHand };
}

function toJokerHand(newHand) {
	const joker = "J";
	const jokerHand = structuredClone(newHand);

	if (jokerHand[joker]) {
		const jokerValue = jokerHand[joker];
		delete jokerHand[joker];

		const maxValues = Object.keys(jokerHand)
			.filter((v) => v != joker)
			.filter((x) => {
				return jokerHand[x] == Math.max.apply(null, Object.values(jokerHand));
			});

		if (maxValues.length > 1) {
			maxValues.sort((a, b) => b.localeCompare(a));
		}
		jokerHand[maxValues[0]] += jokerValue;
	}

	return jokerHand;
}

function getHandType(keyLen, values, cb) {
	if (MAP_POINTS[keyLen]) {
		cb(MAP_POINTS[keyLen]);
	} else if (keyLen == 3) {
		if (values.includes(3)) {
			cb({ point: 4, name: "Three of a kind" });
		} else {
			cb({ point: 3, name: "Two pair" });
		}
	} else if (keyLen == 2) {
		if (values.includes(4)) {
			cb({ point: 6, name: "Four of a kind" });
		} else {
			cb({ point: 5, name: "Full house" });
		}
	}
}
