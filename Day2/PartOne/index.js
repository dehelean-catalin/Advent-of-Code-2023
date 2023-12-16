import fs from "fs";

const MAX_CUBE_NUMBER = {
	red: 12,
	green: 13,
	blue: 14,
};

function partOne(filePath) {
	const games = fs.readFileSync(filePath, "utf-8").trim().split("\r\n");
	let gameIDs = [];

	games.map((game, index) => {
		const strSets = game.split(":")[1];
		const sets = strSets.split(";");
		let flag = true;

		setLoop: for (const set of sets) {
			const hands = set.split(",");

			for (const hand of hands) {
				const values = hand.trim().split(" ");
				const cubeCount = values[0];
				const cubeColor = values[1];

				if (MAX_CUBE_NUMBER[cubeColor] < cubeCount) {
					flag = false;
					break setLoop;
				}
			}
		}

		if (flag) gameIDs.push(index + 1);

		flag = true;
	});

	return gameIDs.reduce((prev, curr) => prev + curr);
}

console.log(partOne("./input.txt"));
