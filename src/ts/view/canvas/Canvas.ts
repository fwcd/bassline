import { ViewNode } from "../ViewNode";
import { RenderNode } from "./RenderNode";
import { Vec2 } from "../../utils/Vec2";
import { DragLock } from "./DragLock";

export class Canvas implements ViewNode, DragLock {
	private element: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private root = new RenderNode();
	private mousePressed = false;
	dragged?: RenderNode = undefined;
	
	public constructor(htmlClass?: string) {
		this.element = document.createElement("canvas");
		this.context = this.element.getContext("2d");
		if (htmlClass) {
			this.element.setAttribute("class", htmlClass);
		}
		this.element.addEventListener("mousedown", event => {
			this.root.onMouseDown(event);
			this.mousePressed = true;
		});
		this.element.addEventListener("mousemove", event => {
			if (this.mousePressed) {
				if (this.dragged) {
					this.dragged.onMouseDrag(event);
				} else {
					this.root.onMouseDrag(event);
				}
			} else {
				this.root.onMouseMove(event);
			}
		});
		this.element.addEventListener("mouseup", event => {
			this.mousePressed = false;
			this.dragged = undefined;
			this.root.onMouseUp(event);
		});
		this.root.dragLock = this;
		this.root.updateListeners.listen(() => this.repaint());
	}
	
	public add(node: RenderNode): void {
		this.root.addChild(node);
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
	
	private repaint(): void {
		this.context.clearRect(0, 0, this.element.width, this.element.height);
		this.root.renderIn(this.context);
	}
}
