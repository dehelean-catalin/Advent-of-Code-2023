import fs from "fs";

const ALPHA_NUMERIC = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

function calibration(fileName) {
	const fileText = fs.readFileSync(fileName, "utf-8").trim().split("\r\n");
	const digits = [];

	fileText.map((line) => {
		let digit = 0;
		const characters = line.split("");

		for (let i = 0; i < characters.length; i++) {
			let j = i + 1;
			while (j <= characters.length) {
				const char = characters.slice(i, j);
				const joinedChar = char.join("");

				if (isDigitOrAlpha(joinedChar)) {
					const { value: numValue, increment } = convertToDigit(joinedChar);

					if (digit == 0) {
						digit += numValue;
					} else if (digit > 0 && digit <= 9) {
						digit = digit * 10 + numValue;
					} else {
						digit = Math.floor(digit / 10) * 10 + numValue;
					}

					i += increment;
					break;
				}

				j++;
			}
		}

		if (digit > 0 && digit <= 9) {
			digit = digit * 10 + digit;
		}

		digits.push(digit);
		digit = 0;
	});
	return digits.reduce((prev, curr) => prev + curr);
}

console.log(calibration("./input.txt"));

function isDigitOrAlpha(value) {
	return !isNaN(Number(value)) || Object.keys(ALPHA_NUMERIC).includes(value);
}

function convertToDigit(value) {
	if (value.length > 1) {
		return {
			value: ALPHA_NUMERIC[value],
			increment: 1,
		};
	}
	return { value: Number(value), increment: 0 };
}
