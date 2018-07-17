export interface FileDropTarget {
	onMouseOver?(filePath: string): void;
	
	onMouseOut?(filePath: string): void;
	
	onDrop(filePath: string): void;
}
