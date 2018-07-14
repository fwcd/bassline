import { Observable } from "../../utils/Observable";

export class DeckModel {
	loadedAudioFile? = new Observable<string>();
	playing = new Observable<boolean>(false);
	shouldPlay = new Observable<boolean>(false);
	
	public play(): void {
		this.shouldPlay.set(true);
	}
	
	public pause(): void {
		this.shouldPlay.set(false);
	}
}
