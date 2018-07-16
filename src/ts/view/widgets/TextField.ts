import { ViewNode } from "../ViewNode";
import { Observable } from "../../utils/Observable";

export class TextField implements ViewNode {
	private element = document.createElement("input");
	private value = new Observable<string>("");
	
	public constructor(htmlClass?: string) {
		this.element.type = "text";
		this.element.classList.add(htmlClass);
		
		this.element.addEventListener("input", () => {
			this.value.set(this.element.value);
		});
	}
	
	public getValue(): string {
		return this.value.get();
	}
	
	public listenToValue(listener: (value: string) => void): void {
		this.value.listen(listener);
	}
	
	public setPlaceholder(text: string): void {
		this.element.placeholder = text;
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
