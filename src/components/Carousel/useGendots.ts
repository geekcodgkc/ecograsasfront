const genDots = (elements: number): [number[], number[]] => {
	const dotsNumber: [number[], number[]] = [[], []];
	[Math.ceil(elements / 3), Math.ceil(elements / 2)].forEach((dot, index) => {
		for (let i = 0; i < dot; i++) {
			dotsNumber[index].push(i);
		}
	});
	return dotsNumber;
};

export default genDots;
