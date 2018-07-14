import { ViewNode } from "../ViewNode";

export class Canvas implements ViewNode {
	private element: HTMLCanvasElement;
	
	public constructor(htmlClass?: string) {
		this.element = document.createElement("canvas");
		if (htmlClass) {
			this.element.setAttribute("class", htmlClass);
		}
	}
	
	public getContext(): CanvasRenderingContext2D {
		return this.element.getContext("2d");
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
