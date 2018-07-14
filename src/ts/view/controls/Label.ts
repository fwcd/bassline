import { ViewNode } from "../ViewNode";

export class Label implements ViewNode {
	private element: HTMLSpanElement;
	
	public constructor(text?: string, htmlClass?: string) {
		this.element = document.createElement("span");
		if (text) {
			this.setText(text);
		}
		if (htmlClass) {
			this.element.setAttribute("class", htmlClass);
		}
	}
	
	public setText(text: string): void {
		this.element.innerText = text;
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
