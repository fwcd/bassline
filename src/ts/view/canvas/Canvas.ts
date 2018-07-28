import { ViewNode } from "../ViewNode";
import { RenderNode } from "./RenderNode";
import { DragLock } from "./DragLock";
import { Rectangle } from "../../utils/Rectangle";
import { CanvasMouseEvent } from "./CanvasMouseEvent";
import { Vec2 } from "../../utils/Vec2";

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
			this.element.classList.add(htmlClass);
		}
		
		this.element.addEventListener("pointerdown", event => {
			this.element.setPointerCapture(event.pointerId);
			this.root.onMouseDown(this.toCanvasEvent(event));
			this.mousePressed = true;
		});
		this.element.addEventListener("pointermove", event => {
			if (this.mousePressed) {
				if (this.dragged) {
					this.dragged.onMouseDrag(this.toCanvasEvent(event));
				} else {
					this.root.onMouseDrag(this.toCanvasEvent(event));
				}
			} else {
				this.root.onMouseMove(this.toCanvasEvent(event));
			}
		});
		this.element.addEventListener("pointerup", event => {
			this.element.releasePointerCapture(event.pointerId);
			this.mousePressed = false;
			this.dragged = undefined;
			this.root.onMouseUp(this.toCanvasEvent(event));
		});
		this.root.dragLock = this;
		this.root.updateListeners.add(() => this.repaint());
	}
	
	public add(node: RenderNode): void {
		this.root.addChild(node);
	}
	
	public getBounds(): Rectangle {
		return this.root.getChilds()
			.map(it => it.getBounds())
			.reduce((a, b) => a.merge(b));
	}
	
	private toCanvasEvent(event: MouseEvent): CanvasMouseEvent {
		let offsetX = this.element.offsetLeft;
		let offsetY = this.element.offsetTop;
		return {
			button: event.button,
			pos: new Vec2(event.x - offsetX, event.y - offsetY)
		};
	}
	
	public updateBoundsAndPaint(): void {
		let bounds = this.getBounds();
		this.element.width = bounds.width;
		this.element.height = bounds.height;
		this.repaint();
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
	
	private repaint(): void {
		this.context.clearRect(0, 0, this.element.width, this.element.height);
		this.root.renderIn(this.context);
	}
}
