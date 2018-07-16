import { ViewNode } from "../ViewNode";
import { removeChilds, newTableRow, newChild } from "../viewutils";

export class Table implements ViewNode {
	private element = document.createElement("table");
	private thead: HTMLTableSectionElement;
	private tbody: HTMLTableSectionElement;
	private colgroup?: HTMLTableColElement;
	private columnHeaders?: HTMLTableRowElement;
	
	public constructor(htmlClass?: string) {
		if (htmlClass) {
			this.element.setAttribute("class", htmlClass);
		}
		this.thead = newChild(this.element, "thead");
		this.tbody = newChild(this.element, "tbody");
	}
	
	public setColumnClasses(...htmlClasses: string[]): void {
		if (this.colgroup) {
			this.element.removeChild(this.colgroup);
		}
		this.colgroup = document.createElement("colgroup");
		htmlClasses.forEach(it => {
			newChild(this.colgroup, "col").setAttribute("class", it);
		});
		this.element.insertAdjacentElement("afterbegin", this.colgroup);
	}
	
	public setColumnHeaders(...columnHeaders: string[]): void {
		if (this.columnHeaders) {
			removeChilds(this.thead);
		}
		this.columnHeaders = newChild(this.thead, "tr");
		columnHeaders.forEach(it => {
			newChild(this.columnHeaders, "th").innerText = it;
		});
	}
	
	public clearRows(): void {
		removeChilds(this.tbody);
	}
	
	public appendRow(...cells: string[]): void {
		this.tbody.appendChild(newTableRow(...cells));
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
