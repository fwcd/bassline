export interface PositiveAndNegative<T> {
	positive: T;
	negative: T;
}

export function clampValue(value: number, minValue: number, maxValue: number): number {
	return Math.min(Math.max(value, minValue), maxValue);
}

export function average(values: number[]): number {
	return values.reduce((a, b) => a + b, 0) / values.length;
}

export function posAndNegAverage(values: number[]): PositiveAndNegative<number> {
	let positives: number[] = [];
	let negatives: number[] = [];
	
	values.forEach(it => {
		if (it >= 0) {
			positives.push(it);
		} else {
			negatives.push(it);
		}
	});
	
	return {
		positive: average(positives),
		negative: average(negatives)
	};
}

export function notNaNOr(possiblyNaN: number, otherwise: number): number {
	return isNaN(possiblyNaN) ? otherwise : possiblyNaN;
}
