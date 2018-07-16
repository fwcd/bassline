export enum LibraryEntryType {
	Audio
}

export interface LibraryEntry {
	name: string;
	artist: string;
	type: LibraryEntryType;
	bpm?: number;
}
