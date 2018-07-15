import { ListenerList } from "../../utils/ListenerList";
import { DragLock } from "./DragLock";
import { Rectangle } from "../../utils/Rectangle";

export class RenderNode {
	private childs: RenderNode[] = [];
	private bounds: Rectangle;
	dragLock: DragLock;
	updateListeners = new ListenerList<void>();
	
	public addChild(child: RenderNode): void {
		child.updateListeners.listen(() => { this.updateListeners.fire(); });
		child.dragLock = this.dragLock;
		this.childs.push(child);
	}
	
	public setBounds(bounds: Rectangle): void {
		this.bounds = bounds;
		this.updateListeners.fire();
	}
	
	public getBounds(): Rectangle { return this.bounds; }
	
	// Intended to be overriden
	public renderIn(graphics: CanvasRenderingContext2D): void {}
	
	// Intended to be overriden
	public handleMouseDown(event: MouseEvent): boolean { return false; }
	
	// Intended to be overriden
	public handleMouseMove(event: MouseEvent): boolean { return false; }
	
	// Intended to be overriden
	public handleMouseDrag(event: MouseEvent): boolean { return false; }
	
	// Intended to be overriden
	public handleMouseUp(event: MouseEvent): boolean { return false; }
	
	public onMouseDown(event: MouseEvent): boolean {
		return this.delegateEvent(event, true, node => node.onMouseDown(event), node => node.handleMouseDown(event));
	}
	
	public onMouseMove(event: MouseEvent): boolean {
		return this.delegateEvent(event, false, node => node.onMouseMove(event), node => node.handleMouseMove(event));
	}
	
	public onMouseDrag(event: MouseEvent): boolean {
		return this.delegateEvent(event, false, node => node.onMouseDrag(event), node => node.handleMouseDrag(event));
	}
	
	public onMouseUp(event: MouseEvent): boolean {
		return this.delegateEvent(event, false, node => node.onMouseUp(event), node => node.handleMouseUp(event));
	}
	
	private delegateEvent(event: MouseEvent, lockDrag: boolean, firstHandler: (node: RenderNode) => boolean, handler: (node: RenderNode) => boolean): boolean {
		this.childs.forEach(child => {
			if (child.bounds.containsPos(event.x, event.y)) {
				if (firstHandler(child)) {
					if (lockDrag) {
						this.dragLock.dragged = this;
					}
					return true;
				}
			}
		});
		return handler(this);
	}
}
