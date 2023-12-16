import fs from "fs";

function calibration(fileName) {
	const fileText = fs.readFileSync(fileName, "utf-8").trim().split("\r\n");
	const digits = [];

	fileText.map((line) => {
		let digit = 0;
		for (const char of line) {
			if (!isNaN(char)) {
				const numValue = Number(char);
				if (digit == 0) {
					digit += numValue;
				} else if (digit > 0 && digit <= 9) {
					digit = digit * 10 + numValue;
				} else {
					digit = Math.floor(digit / 10) * 10 + numValue;
				}
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
