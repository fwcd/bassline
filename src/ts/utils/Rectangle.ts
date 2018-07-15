import { Vec2 } from "./Vec2";

export class Rectangle {
	public readonly topLeft: Vec2;
	public readonly width: number;
	public readonly height: number;
	
	public constructor(topLeft: Vec2, width: number, height: number) {
		this.topLeft = topLeft;
		this.width = width;
		this.height = height;
	}
	
	public contains(pos: Vec2): boolean {
		return this.containsPos(pos.x, pos.y);
	}
	
	public containsPos(x: number, y: number): boolean {
		let minX = this.topLeft.x;
		let minY = this.topLeft.y;
		let maxX = minX + this.width;
		let maxY = minY + this.height;
		return x >= minX && x <= maxX && y >= minY && y <= maxY;
	}
	
	public at(newTopLeft: Vec2): Rectangle {
		return new Rectangle(newTopLeft, this.width, this.height);
	}
	
	public withSize(newWidth: number, newHeight: number): Rectangle {
		return new Rectangle(this.topLeft, this.width, this.height);
	}
}
