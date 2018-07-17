export interface AudioBackend {
	play(): void;
	
	pause(): void;
	
	load(filePath: string): void;
}
