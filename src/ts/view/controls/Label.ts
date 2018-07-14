import { ViewNode } from "../ViewNode";

export class Label implements ViewNode {
	private element: HTMLElement;
	
	public constructor(text: string) {
		this.element = document.createElement("span");
		this.element.innerText = text;
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
