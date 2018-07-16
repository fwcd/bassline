import { ViewNode } from "../ViewNode";
import { newNestedChilds, removeChilds, newTableRow } from "../viewutils";

export class Table implements ViewNode {
	private element = document.createElement("table");
	private tbody: HTMLTableSectionElement;
	private theadRow?: HTMLTableRowElement;
	
	public constructor(htmlClass?: string) {
		if (htmlClass) {
			this.element.setAttribute("class", htmlClass);
		}
		this.tbody = document.createElement("tbody");
		this.element.appendChild(this.tbody);
	}
	
	public setColumnHeaders(...columnHeaders: string[]): void {
		if (!this.theadRow) {
			this.theadRow = newNestedChilds(this.element, "thead", "tr") as HTMLTableRowElement;
		} else {
			removeChilds(this.theadRow);
		}
		
		columnHeaders.forEach(it => {
			newNestedChilds(this.theadRow, "th").innerText = it;
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
