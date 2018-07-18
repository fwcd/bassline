/**
 * Represents a subsequence of a Float32Array.
 */
export class SubFloat32Array {
	private readonly base: Float32Array;
	private readonly start: number;
	private readonly end: number;
	private readonly step: number;
	public readonly length: number;
	
	public constructor(base: Float32Array, start?: number, end?: number, step?: number) {
		this.base = base;
		this.start = start || 0;
		this.end = end || base.length;
		this.step = step || 1;
		this.length = (this.end - this.start) / this.step;
	}
	
	public get(index: number): number {
		return this.base[(index * this.step) + this.start];
	}
	
	public reduce(accumulator: (a: number, b: number) => number): number {
		let value = this.get(0);
		for (let i=1; i<this.length; i++) {
			value = accumulator(value, this.get(i));
		}
		return value;
	}
}
