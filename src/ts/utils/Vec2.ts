export class Vec2 {
	public readonly x: number;
	public readonly y: number;
	
	public constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	
	public plus(rhs: Vec2): Vec2 {
		return new Vec2(this.x + rhs.x, this.y + rhs.y);
	}
	
	public minus(rhs: Vec2): Vec2 {
		return new Vec2(this.x - rhs.x, this.y - rhs.y);
	}
	
	public scale(factor: number): Vec2 {
		return new Vec2(this.x * factor, this.y * factor);
	}
	
	public length(): number {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}
	
	public min(rhs: Vec2): Vec2 {
		return new Vec2(Math.min(this.x, rhs.x), Math.min(this.y, rhs.y));
	}
	
	public max(rhs: Vec2): Vec2 {
		return new Vec2(Math.max(this.x, rhs.x), Math.max(this.y, rhs.y));
	}
	
	public normalize(): Vec2 {
		return this.scale(1.0 / this.length());
	}
}
