import { Observable } from "../../utils/Observable";
import { LibraryEntry, LibraryEntryType } from "./LibraryEntry";
import { walkFileTree } from "../../utils/FileUtils";
import { readTrackInfo } from "../track/TrackInfoReader";

export class LibraryModel {
	rootFolder = new Observable<string>();
	entries: Observable<LibraryEntry[]> = this.rootFolder.deriveAsync((root, self) => {
		self.set([]);
		walkFileTree(root, file => {
			let trackInfo = readTrackInfo(file, info => {
				self.use(entryList => entryList.push(<LibraryEntry>{
					name: info.name,
					artist: info.artist,
					type: LibraryEntryType.Audio
				}));
			});
		});
	});
}
