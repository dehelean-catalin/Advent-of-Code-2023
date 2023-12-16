import fs from "fs";

function partTwo(filePath) {
	const games = fs.readFileSync(filePath, "utf-8").trim().split("\r\n");
	const gameScores = [];

	games.forEach((game, index) => {
		const setStr = game.split(":")[1];
		const sets = setStr.split(";");
		const maxCubeValues = { red: 1, green: 1, blue: 1 };

		for (const set of sets) {
			const hands = set.split(",");

			for (const hand of hands) {
				const values = hand.trim().split(" ");
				const cubeColor = values[1];
				const cubeCount = values[0];
				if (maxCubeValues[cubeColor] < Number(cubeCount)) {
					maxCubeValues[cubeColor] = Number(cubeCount);
				}
			}
		}

		const gameScore = Object.values(maxCubeValues).reduce(
			(prev, curr) => prev * curr
		);
		gameScores.push(gameScore);
	});

	return gameScores.reduce((prev, curr) => prev + curr);
}

console.log(partTwo("./input.txt"));
