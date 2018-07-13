import { ViewNode } from "../ViewNode";

export class DeckInputChooser implements ViewNode {
	private element: HTMLInputElement = document.createElement("input");
	
	public constructor() {
		this.element.setAttribute("type", "file");
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
