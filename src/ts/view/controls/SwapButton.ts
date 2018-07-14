import { Button } from "./Button";
import { ViewNode } from "../ViewNode";

export interface ButtonState {
	node: ViewNode,
	action: () => void
}

export class SwapButton implements ViewNode {
	private button: Button;
	private initialized = false;
	private initialState: string;
	private states?: { [keys: string]: ButtonState; };
	
	public constructor(initialState: string, htmlClass?: string) {
		this.button = new Button(undefined, htmlClass);
		this.initialState = initialState;
	}
	
	public setStates(states: { [keys: string]: ButtonState; }): void {
		this.states = states;
		if (!this.initialized) {
			this.swap(this.initialState);
			this.initialized = true;
		}
	}
	
	public swap(newState: string): void {
		this.swapContent(this.states[newState]);
	}
	
	private swapContent(newContent: ButtonState): void {
		this.button.setContent(newContent.node);
		this.button.setAction(newContent.action);
	}
	
	public placeIn(parent: HTMLElement): void {
		this.button.placeIn(parent);
	}
}
