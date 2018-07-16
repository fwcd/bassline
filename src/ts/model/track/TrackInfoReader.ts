import { TrackInfo } from "./TrackInfo";
import * as jsmediatags from "jsmediatags";

export function readTrackInfo(file: string, callback: (info: TrackInfo) => void): void {
	jsmediatags.read(file, {
		onSuccess: tag => {
			let tags = tag.tags;
			callback(<TrackInfo>{
				name: tags.title,
				artist: tags.artist
			});
		},
		onError: () => {}
	});
}
