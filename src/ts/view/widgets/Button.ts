import { ViewNode } from "../ViewNode";

export class Button implements ViewNode {
	private element: HTMLButtonElement;
	private action?: () => void;
	
	public constructor(content?: ViewNode, htmlClass?: string, action?: () => void) {
		this.action = action;
		this.element = document.createElement("button");
		this.element.addEventListener("click", () => {
			if (this.action) {
				this.action();
			}
		});
		if (htmlClass) {
			this.element.classList.add(htmlClass);
		}
		if (content) {
			content.placeIn(this.element);
		}
	}
	
	public setContent(content: ViewNode): void {
		if (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}
		content.placeIn(this.element);
	}
	
	public setAction(action: () => void): void {
		this.action = action;
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
