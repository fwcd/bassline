import { Observable } from "../../utils/Observable";
import { TrackInfo } from "../track/TrackInfo";
import { readTrackInfo } from "../track/TrackInfoReader";
import { TwoWayObservable } from "../../utils/TwoWayObservable";

export class DeckModel {
	focused = new Observable<boolean>(false);
	loadedAudioFile? = new Observable<string>();
	playing = new TwoWayObservable<boolean>(false);
	fader = new Observable<number>(1.0); // A bounded value between 0 and 1 where 0 = silent and 1 = normal volume
	trackInfo: Observable<TrackInfo> = this.loadedAudioFile.deriveAsync((file, self) => {
		readTrackInfo(file, info => self.set(info))
	});
	positionInSec = new TwoWayObservable<number>(0);
	durationInSec = new Observable<number>(0);
	audioContext = new AudioContext();
	
	public play(): void {
		this.playing.request(true);
	}
	
	public pause(): void {
		this.playing.request(false);
	}
	
	public progressInPercent(): number {
		return this.positionInSec.orElse(0) / this.durationInSec.orElse(1);
	}
}
