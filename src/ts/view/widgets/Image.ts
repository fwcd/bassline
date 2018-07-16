import { ViewNode } from "../ViewNode";

export class Image implements ViewNode {
	private element: HTMLImageElement;
	
	public constructor(src: string, htmlClass: string) {
		this.element = document.createElement("img");
		this.element.classList.add(htmlClass);
		this.element.src = src;
	}
	
	public static ofAsset(assetPath: string, htmlClass: string): Image {
		return new Image("assets/" + assetPath, htmlClass);
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
