export interface AudioBackend {
	play(): void;
	
	pause(): void;
	
	setFaderVolume(faderVolume: number): void;
	
	load(filePath: string): void;
}
