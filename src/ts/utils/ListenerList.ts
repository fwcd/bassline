export class ListenerList<T> {
	private listeners: ((event: T) => void)[] = [];
	
	public add(listener: (event: T) => void): void {
		this.listeners.push(listener);
	}
	
	public fire(): void {
		this.fireWith(null);
	}
	
	public fireWith(event: T): void {
		this.listeners.forEach(it => it(event));
	}
}
