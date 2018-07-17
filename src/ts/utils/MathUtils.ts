export function clampValue(value: number, minValue: number, maxValue: number): number {
	return Math.min(Math.max(value, minValue), maxValue);
}

export function average(values: number[]): number {
	return values.reduce((a, b) => a + b) / values.length;
}
