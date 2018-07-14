import { ViewNode } from "../ViewNode";
import { ListenerList } from "../../utils/ListenerList";

export class Button implements ViewNode {
	private text?: string;
	private assetPath?: string;
	private imgClass?: string;
	private htmlClass?: string;
	private action: () => void;
	changeListeners = new ListenerList<void>();
	
	private constructor(text?: string, assetPath?: string, imgClass?: string) {
		this.text = text;
		this.assetPath = assetPath;
		this.imgClass = imgClass;
	}
	
	public static withText(text: string): Button {
		return new Button(text, undefined, undefined);
	}
	
	public static withIcon(assetPath: string, imgClass: string): Button {
		return new Button(undefined, assetPath, imgClass);
	}
	
	public setClass(htmlClass: string): void {
		this.htmlClass = htmlClass;
	}
	
	public setAction(action: () => void): void {
		this.action = action;
	}
	
	public placeIn(parent: HTMLElement): void {
		let button = document.createElement("button");
		button.addEventListener("click", () => {
			if (this.action) {
				this.action();
			}
		});
		if (this.htmlClass) {
			button.setAttribute("class", this.htmlClass);
		}
		if (this.text) {
			button.innerHTML = this.text;
		}
		if (this.assetPath) {
			let icon = document.createElement("img");
			icon.setAttribute("class", this.imgClass);
			icon.src = "assets/" + this.assetPath;
			button.appendChild(icon);
		}
		parent.appendChild(button);
	}
}
