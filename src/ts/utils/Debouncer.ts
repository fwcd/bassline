export class Debouncer {
	private lastCall: number = Date.now();
	private timeout = 100; // ms
	
	/**
	 * Only runs the task if the timeout has been exceeded
	 * since the last call, otherwise does nothing.
	 */
	public executeMaybe(task: () => void): void {
		let now = Date.now();
		if ((now - this.lastCall) > this.timeout) {
			task();
			this.lastCall = now;
		}
	}
}
