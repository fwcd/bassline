import { DeckModel } from "../../model/deck/DeckModel";
import { ViewNode } from "../ViewNode";
import { Crossfader2DView } from "./Crossfader2DView";
import { Canvas } from "../canvas/Canvas";
import { Crossfader2DModel } from "../../model/fader/Crossfader2DModel";

export class CentralFaderPanel implements ViewNode {
	private canvas = new Canvas();
	private crossfader: Crossfader2DView;
	
	public constructor(
		topLeftDeck: DeckModel,
		topRightDeck: DeckModel,
		bottomLeftDeck: DeckModel,
		bottomRightDeck: DeckModel
	) {
		this.crossfader = new Crossfader2DView(new Crossfader2DModel(topLeftDeck, topRightDeck, bottomLeftDeck, bottomRightDeck));
		this.canvas.add(this.crossfader);
		this.canvas.updateBoundsAndPaint();
	}
	
	public placeIn(parent: HTMLElement): void {
		this.canvas.placeIn(parent);
	}
}
