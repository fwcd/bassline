import { Button } from "./Button";
import { ViewNode } from "../ViewNode";

export class SwapButton implements ViewNode {
	private element = document.createElement("div");
	private initialized = false;
	private initialState: string;
	private states?: { [keys: string]: Button; };
	
	public constructor(initialState: string) {
		this.initialState = initialState;
	}
	
	public setStates(states: { [keys: string]: Button; }): void {
		this.states = states;
		if (!this.initialized) {
			this.swap(this.initialState);
			this.initialized = true;
		}
	}
	
	public swap(newState: string): void {
		this.swapButton(this.states[newState]);
	}
	
	private swapButton(newButton: Button): void {
		this.clear();
		newButton.placeIn(this.element);
	}
	
	private clear(): void {
		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
