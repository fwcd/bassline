import { Vec2 } from "./Vec2";
import { clampValue } from "./MathUtils";

export class Rectangle {
	public readonly topLeft: Vec2;
	public readonly width: number;
	public readonly height: number;
	
	public constructor(topLeft: Vec2, width: number, height: number) {
		this.topLeft = topLeft;
		this.width = width;
		this.height = height;
	}
	
	public static between(topLeft: Vec2, bottomRight: Vec2): Rectangle {
		let size = bottomRight.minus(topLeft);
		return new Rectangle(topLeft, size.x, size.y);
	}
	
	public bottomRight(): Vec2 {
		return this.topLeft.plus(new Vec2(this.width, this.height));
	}
	
	public clamp(pos: Vec2): Vec2 {
		let minX = this.topLeft.x;
		let minY = this.topLeft.y;
		let maxX = minX + this.width;
		let maxY = minY + this.height;
		return new Vec2(clampValue(pos.x, minX, maxX), clampValue(pos.y, minY, maxY));
	}
	
	public getCenter(): Vec2 {
		return this.topLeft.plus(new Vec2(this.width / 2, this.height / 2));
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
	
	public merge(rhs: Rectangle): Rectangle {
		let bottomRight = this.bottomRight();
		let rhsBottomRight = rhs.bottomRight();
		return Rectangle.between(this.topLeft.min(rhs.topLeft), bottomRight.max(rhsBottomRight));
	}
	
	public at(newTopLeft: Vec2): Rectangle {
		return new Rectangle(newTopLeft, this.width, this.height);
	}
	
	public withSize(newWidth: number, newHeight: number): Rectangle {
		return new Rectangle(this.topLeft, this.width, this.height);
	}
}
