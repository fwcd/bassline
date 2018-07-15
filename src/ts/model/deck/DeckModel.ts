import { Observable } from "../../utils/Observable";
import * as jsmediatags from "jsmediatags";
import { TrackInfo } from "./TrackInfo";

export class DeckModel {
	focused = new Observable<boolean>(false);
	loadedAudioFile? = new Observable<string>();
	playing = new Observable<boolean>(false);
	shouldPlay = new Observable<boolean>(false);
	fader = new Observable<number>(1.0); // A bounded value between 0 and 1 where 0 = silent and 1 = normal volume
	trackInfo: Observable<TrackInfo> = this.loadedAudioFile.deriveAsync((file, self) => {
		jsmediatags.read(file, {
			onSuccess: tag => {
				let tags = tag.tags;
				self.set(<TrackInfo>{
					name: tags.title,
					artist: tags.artist
				});
			},
			onError: () => {}
		});
	});
	
	public play(): void {
		this.shouldPlay.set(true);
	}
	
	public pause(): void {
		this.shouldPlay.set(false);
	}
}
