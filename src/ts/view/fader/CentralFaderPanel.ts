import { DeckModel } from "../../model/deck/DeckModel";
import { ViewNode } from "../ViewNode";
import { Crossfader2D } from "./Crossfader2D";
import { Canvas } from "../canvas/Canvas";

export class CentralFaderPanel implements ViewNode {
	private canvas = new Canvas();
	private crossfader: Crossfader2D;
	
	public constructor(
		topLeftDeck: DeckModel,
		topRightDeck: DeckModel,
		bottomLeftDeck: DeckModel,
		bottomRightDeck: DeckModel
	) {
		this.crossfader = new Crossfader2D(topLeftDeck, topRightDeck, bottomLeftDeck, bottomRightDeck);
		this.canvas.add(this.crossfader);
		this.canvas.updateBoundsAndPaint();
	}
	
	public placeIn(parent: HTMLElement): void {
		this.canvas.placeIn(parent);
	}
}
