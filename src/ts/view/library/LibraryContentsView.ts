import { ViewNode } from "../ViewNode";
import { LibraryModel } from "../../model/library/LibraryModel";
import { Table } from "../widgets/Table";

export class LibraryContentsView implements ViewNode {
	private table: Table;
	
	public constructor(model: LibraryModel, htmlClass?: string) {
		this.table = new Table(htmlClass);
		this.table.setColumnHeaders("Name", "Artist", "BPM");
		
		model.entries.listen(entries => {
			this.table.clearRows();
			entries.forEach(entry => {
				let bpm: string = (entry.bpm + "") || "?";
				this.table.appendRow(entry.name, entry.artist, bpm);
			});
		});
	}
	
	public placeIn(parent: HTMLElement): void {
		this.table.placeIn(parent);
	}
}
