export function getOr<T>(arr: T[], index: number, defaultValue: T): T {
	if (index >= 0 && index < arr.length) {
		return arr[index];
	} else {
		return defaultValue;
	}
}

export function getFloatOr(arr: Float32Array, index: number, defaultValue: number): number {
	if (index >= 0 && index < arr.length) {
		return arr[index];
	} else {
		return defaultValue;
	}
}

export function outOfBounds(arr: any, index: number): boolean {
	return index < 0 || index >= arr.length;
}
