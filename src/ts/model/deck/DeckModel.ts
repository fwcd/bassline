import { Observable } from "../../utils/Observable";
import * as jsmediatags from "jsmediatags";
import { TrackInfo } from "./TrackInfo";

export class DeckModel {
	loadedAudioFile? = new Observable<string>();
	playing = new Observable<boolean>(false);
	shouldPlay = new Observable<boolean>(false);
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
