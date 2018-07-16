import { ViewNode } from "../ViewNode";
import { removeChilds, newTableRow, newChild } from "../viewutils";
import { Observable } from "../../utils/Observable";
import { strContains } from "../../utils/StringUtils";

interface TableRow {
	cells: Observable<string[]>;
}

interface TableModel {
	rows: Observable<TableRow[]>;
	filter?: (row: TableRow) => boolean;
	sorter?: (a: TableRow, b: TableRow) => number; // -1 = correct order, 1 = swap order
}

interface SortDescriptor {
	column: number;
	ascending: boolean;
}

export class Table implements ViewNode {
	private element = document.createElement("table");
	private thead: HTMLTableSectionElement;
	private tbody: HTMLTableSectionElement;
	private colgroup?: HTMLTableColElement;
	private columnHeaders?: HTMLTableRowElement;
	private model: TableModel = {
		rows: new Observable<TableRow[]>([])
	};
	private sortDescriptor?: SortDescriptor;
	
	public constructor(htmlClass?: string) {
		if (htmlClass) {
			this.element.classList.add(htmlClass);
		}
		this.thead = newChild(this.element, "thead");
		this.tbody = newChild(this.element, "tbody");
		
		this.model.rows.listen(rawRows => {
			removeChilds(this.tbody);
			let rows = rawRows;
			
			if (this.model.sorter) {
				rows.sort(this.model.sorter);
			}
			
			rows.forEach(row => {
				this.appendTableRowIfFiltered(row);
			});
		});
	}
	
	public setColumnClasses(...htmlClasses: string[]): void {
		if (this.colgroup) {
			this.element.removeChild(this.colgroup);
		}
		this.colgroup = document.createElement("colgroup");
		htmlClasses.forEach(it => {
			newChild(this.colgroup, "col").classList.add(it);
		});
		this.element.insertAdjacentElement("afterbegin", this.colgroup);
	}
	
	public setColumnHeaders(...columnHeaders: string[]): void {
		if (this.columnHeaders) {
			removeChilds(this.thead);
		}
		this.columnHeaders = newChild(this.thead, "tr");
		columnHeaders.forEach((colHeader, colIndex) => {
			let header = newChild(this.columnHeaders, "th");
			header.innerText = colHeader;
			
			// Sort when clicking on header
			header.addEventListener("click", () => {
				if (this.sortDescriptor && this.sortDescriptor.column == colIndex) {
					// Already sorting this column, thus cycling ascending/descending/none modes
					this.cycleCurrentSort();
				} else {
					this.sortByColumn(colIndex, true);
				}
				
				// Set sorting indicator if currently sorting
				if (this.sortDescriptor) {
					let indicator = (this.sortDescriptor.ascending ? "^" : "v");
					header.innerText = colHeader + " " + indicator;
				} else {
					header.innerText = colHeader;
				}
			});
		});
	}
	
	private cycleCurrentSort(): void {
		let columnIndex = this.sortDescriptor.column;
		if (this.sortDescriptor.ascending) {
			this.sortByColumn(columnIndex, false);
		} else { // is descending
			this.resetSort();
		}
	}
	
	public resetSort(): void {
		this.sortDescriptor = undefined;
		this.model.sorter = undefined;
		this.fireModelUpdate();
	}
	
	public sortByColumn(columnIndex: number, ascending: boolean): void {
		this.sortDescriptor = {
			column: columnIndex,
			ascending: ascending
		};
		this.model.sorter = (rowA, rowB) => {
			let cellA = rowA.cells.get()[columnIndex];
			let cellB = rowB.cells.get()[columnIndex];
			let signum = (ascending ? 1 : -1);
			return signum * cellA.localeCompare(cellB);
		};
		this.fireModelUpdate();
	}
	
	public filterBy(pattern: string): void {
		if (pattern.length > 0) {
			let lcPattern = pattern.toLowerCase();
			this.model.filter = (row) => row.cells.get().filter(cell => strContains(cell.toLowerCase(), lcPattern)).length > 0;
		} else {
			this.model.filter = undefined;
		}
		this.fireModelUpdate();
	}
	
	public filterCaseSensitiveBy(pattern: string): void {
		if (pattern.length > 0) {
			this.model.filter = (row) => row.cells.get().filter(cell => strContains(cell, pattern)).length > 0;
		} else {
			this.model.filter = undefined;
		}
		this.fireModelUpdate();
	}
	
	private fireModelUpdate(): void {
		this.model.rows.fire();
	}
	
	public clearRows(): void {
		this.model.rows.set([]);
	}
	
	public setContents(...rows: string[][]): void {
		this.model.rows.set(rows.map(it => this.toTableRow(it)));
	}
	
	private appendTableRowIfFiltered(row: TableRow): void {
		if (!this.model.filter || this.model.filter(row)) {
			this.tbody.appendChild(newTableRow(...row.cells.get()));
		}
	}
	
	private toTableRow(cellValues: string[]): TableRow {
		return {
			cells: new Observable(cellValues)
		};
	}
	
	public appendRow(...cellValues: string[]): void {
		let row = this.toTableRow(cellValues);
		// Silently append to model
		this.model.rows.get().push(row);
		// Update view
		this.appendTableRowIfFiltered(row);
	}
	
	public placeIn(parent: HTMLElement): void {
		parent.appendChild(this.element);
	}
}
