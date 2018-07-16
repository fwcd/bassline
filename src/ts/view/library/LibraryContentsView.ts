import { ViewNode } from "../ViewNode";
import { LibraryModel } from "../../model/library/LibraryModel";
import { Table } from "../widgets/Table";

export class LibraryContentsView implements ViewNode {
	private table: Table;
	
	public constructor(model: LibraryModel, htmlClass?: string) {
		this.table = new Table(htmlClass);
		this.table.setColumnClasses("library-name-col", "library-artist-col", "library-bpm-col");
		this.table.setColumnHeaders("Name", "Artist", "BPM");
		
		model.entries.listen(entries => {
			this.table.clearRows();
			entries.forEach(entry => {
				let bpm: string = (entry.bpm || 0) + "";
				this.table.appendRow(entry.name, entry.artist, bpm);
			});
		});
		model.filter.listen(filter => {
			this.table.filterBy(filter);
		});
	}
	
	public placeIn(parent: HTMLElement): void {
		this.table.placeIn(parent);
	}
}
