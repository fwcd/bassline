import { Observable } from "../../utils/Observable";
import { TrackInfo } from "../track/TrackInfo";
import { readTrackInfo } from "../track/TrackInfoReader";

export class DeckModel {
	focused = new Observable<boolean>(false);
	loadedAudioFile? = new Observable<string>();
	playing = new Observable<boolean>(false);
	shouldPlay = new Observable<boolean>(false);
	fader = new Observable<number>(1.0); // A bounded value between 0 and 1 where 0 = silent and 1 = normal volume
	trackInfo: Observable<TrackInfo> = this.loadedAudioFile.deriveAsync((file, self) => {
		readTrackInfo(file, info => self.set(info))
	});
	
	public play(): void {
		this.shouldPlay.set(true);
	}
	
	public pause(): void {
		this.shouldPlay.set(false);
	}
}
