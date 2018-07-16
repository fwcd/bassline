import { RenderNode } from "../canvas/RenderNode";
import { Rectangle } from "../../utils/Rectangle";
import { Vec2 } from "../../utils/Vec2";
import { CanvasMouseEvent } from "../canvas/CanvasMouseEvent";
import { Crossfader2DModel } from "../../model/fader/Crossfader2DModel";

export class Crossfader2DView extends RenderNode {
	private model: Crossfader2DModel;
	private width = 300;
	private height = 170;
	private knobRadius = 10;
	private crosshairLength = 30;
	
	public constructor(model: Crossfader2DModel) {
		super();
		this.model = model;
		this.setBounds(new Rectangle(new Vec2(0, 0), this.width, this.height));
	}
	
	private toViewPos(normalizedPos: Vec2): Vec2 {
		return new Vec2(
			((normalizedPos.x + 1) / 2) * this.width,
			((normalizedPos.y + 1) / 2) * this.height
		);
	}
	
	private toNormalizedPos(viewPos: Vec2): Vec2 {
		return new Vec2(
			((viewPos.x / this.width) * 2) - 1,
			((viewPos.y / this.height) * 2) - 1
		);
	}
	
	// Override
	public renderIn(graphics: CanvasRenderingContext2D): void {
		let bounds = this.getBounds();
		let center = bounds.getCenter();
		let knobPos = this.toViewPos(this.model.normalizedPos.get());
		let halfCrosshairLength = this.crosshairLength / 2;
		
		// Draw background
		graphics.fillStyle = "#222222";
		graphics.fillRect(bounds.topLeft.x, bounds.topLeft.y, bounds.width, bounds.height);
		
		// Draw crosshair
		graphics.strokeStyle = "#BBBBBB";
		graphics.beginPath();
		graphics.moveTo(center.x - halfCrosshairLength, center.y);
		graphics.lineTo(center.x + halfCrosshairLength, center.y);
		graphics.stroke();
		graphics.beginPath();
		graphics.moveTo(center.x, center.y - halfCrosshairLength);
		graphics.lineTo(center.x, center.y + halfCrosshairLength);
		graphics.stroke();
		
		// Draw knob
		graphics.beginPath();
		graphics.arc(knobPos.x, knobPos.y, this.knobRadius, 0, 2 * Math.PI);
		graphics.fillStyle = "#42f1f4";
		graphics.fill();
	}
	
	// Override
	public handleMouseDown(event: CanvasMouseEvent): boolean {
		return this.handleMouseDrag(event);
	}
	
	// Override
	public handleMouseDrag(event: CanvasMouseEvent): boolean {
		this.model.normalizedPos.set(
			this.toNormalizedPos(this.limitToBounds(event.pos))
		);
		this.updateListeners.fire();
		return true;
	}
	
	private limitToBounds(pos: Vec2): Vec2 {
		return this.getBounds().clamp(pos);
	}
}
