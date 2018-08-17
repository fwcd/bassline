import { ListenerList } from "../../utils/ListenerList";
import { DragLock } from "./DragLock";
import { Rectangle } from "../../utils/Rectangle";
import { CanvasMouseEvent } from "./CanvasMouseEvent";

export class RenderNode {
	private childs: RenderNode[] = [];
	private bounds: Rectangle;
	dragLock: DragLock;
	updateListeners = new ListenerList<void>();
	
	public addChild(child: RenderNode): void {
		child.updateListeners.add(() => { this.updateListeners.fire(); });
		child.dragLock = this.dragLock;
		this.childs.push(child);
	}
	
	public getChilds(): RenderNode[] {
		return this.childs;
	}
	
	public setBounds(bounds: Rectangle): void {
		this.bounds = bounds;
		this.updateListeners.fire();
	}
	
	public getBounds(): Rectangle { return this.bounds; }
	
	// Intended to be overriden
	public renderIn(graphics: CanvasRenderingContext2D): void {
		this.childs.forEach(it => it.renderIn(graphics));
	}
	
	// Intended to be overriden
	public handleMouseDown(event: CanvasMouseEvent): boolean { return false; }
	
	// Intended to be overriden
	public handleMouseMove(event: CanvasMouseEvent): boolean { return false; }
	
	// Intended to be overriden
	public handleMouseDrag(event: CanvasMouseEvent): boolean { return false; }
	
	// Intended to be overriden
	public handleMouseUp(event: CanvasMouseEvent): boolean { return false; }
	
	public onMouseDown(event: CanvasMouseEvent): boolean {
		return this.delegateEvent(event, true, node => node.onMouseDown(event), (node) => node.handleMouseDown(event));
	}
	
	public onMouseMove(event: CanvasMouseEvent): boolean {
		return this.delegateEvent(event, false, node => node.onMouseMove(event), node => node.handleMouseMove(event));
	}
	
	public onMouseDrag(event: CanvasMouseEvent): boolean {
		return this.delegateEvent(event, false, node => node.onMouseDrag(event), node => node.handleMouseDrag(event));
	}
	
	public onMouseUp(event: CanvasMouseEvent): boolean {
		return this.delegateEvent(event, false, node => node.onMouseUp(event), node => node.handleMouseUp(event));
	}
	
	private delegateEvent(event: CanvasMouseEvent, lockDrag: boolean, firstHandler: (node: RenderNode) => boolean, handler: (node: RenderNode) => boolean): boolean {
		this.childs.forEach(child => {
			if (child.bounds.containsPos(event.pos.x, event.pos.y)) {
				if (firstHandler(child)) {
					if (lockDrag) {
						this.dragLock.dragged = child;
					}
					return true;
				}
			}
		});
		let handled = handler(this);
		if (handled && lockDrag) {
			this.dragLock.dragged = this;
		}
		return handled;
	}
}
