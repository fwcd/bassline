import { Observable } from "../../utils/Observable";
import { Vec2 } from "../../utils/Vec2";
import { DeckModel } from "../deck/DeckModel";
import { Rectangle } from "../../utils/Rectangle";

export class Crossfader2DModel {
	/**
	 * A normalized position inside the following bounds:
	 * 
	 * (-1|-1)----( 0|-1)----( 1|-1)
	 * |             |             |
	 * (-1| 0)----( 0| 0)----( 1| 0)
	 * |             |             |
	 * (-1| 1)----( 0| 1)----( 1| 1)
	 */
	normalizedPos = new Observable(new Vec2(0, 0));
	
	public constructor(
		topLeftDeck: DeckModel,
		topRightDeck: DeckModel,
		bottomLeftDeck: DeckModel,
		bottomRightDeck: DeckModel
	) {
		let topLeftRect = new Rectangle(new Vec2(-1, -1), 1, 1);
		let topRightRect = new Rectangle(new Vec2(0, -1), 1, 1);
		let bottomLeftRect = new Rectangle(new Vec2(-1, 1), 1, 1);
		let bottomRightRect = new Rectangle(new Vec2(0, 0), 1, 1);
		this.normalizedPos.listen(faderPos => {
			topLeftDeck.fader.set(this.singleFaderVolume(topLeftRect, faderPos));
			topRightDeck.fader.set(this.singleFaderVolume(topRightRect, faderPos));
			bottomLeftDeck.fader.set(this.singleFaderVolume(bottomLeftRect, faderPos));
			bottomRightDeck.fader.set(this.singleFaderVolume(bottomRightRect, faderPos));
		});
	}
	
	/** A value between 0 (= silent) and 1 (= normal volume) */
	private singleFaderVolume(fullVolumeArea: Rectangle, pos: Vec2): number {
		if (fullVolumeArea.contains(pos)) {
			return 1;
		} else {
			let fullVolumeBoundPos = fullVolumeArea.clamp(pos);
			return 1 - pos.distanceTo(fullVolumeBoundPos);
		}
	}
}
