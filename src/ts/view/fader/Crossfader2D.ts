import { RenderNode } from "../canvas/RenderNode";
import { DeckModel } from "../../model/deck/DeckModel";
import { Rectangle } from "../../utils/Rectangle";
import { Vec2 } from "../../utils/Vec2";
import { CanvasMouseEvent, MouseButton } from "../canvas/CanvasMouseEvent";

export class Crossfader2D extends RenderNode {
	private width = 300;
	private height = 170;
	private knobRadius = 10;
	private faderPos?: Vec2 = undefined;
	
	public constructor(
		topLeftDeck: DeckModel,
		topRightDeck: DeckModel,
		bottomLeftDeck: DeckModel,
		bottomRightDeck: DeckModel
	) {
		super();
		this.setBounds(new Rectangle(new Vec2(0, 0), this.width, this.height));
	}
	
	// Override
	public renderIn(graphics: CanvasRenderingContext2D): void {
		let bounds = this.getBounds();
		
		graphics.fillStyle = "#222222";
		graphics.fillRect(bounds.topLeft.x, bounds.topLeft.y, bounds.width, bounds.height);
		
		if (this.faderPos) {
			// Draw knob
			graphics.beginPath();
			graphics.arc(this.faderPos.x, this.faderPos.y, this.knobRadius, 0, 2 * Math.PI);
			graphics.fillStyle = "#42f1f4";
			graphics.fill();
		}
	}
	
	// Override
	public handleMouseDown(event: CanvasMouseEvent): boolean {
		return this.handleMouseDrag(event);
	}
	
	// Override
	public handleMouseDrag(event: CanvasMouseEvent): boolean {
		this.faderPos = event.pos;
		this.updateListeners.fire();
		return true;
	}
}
