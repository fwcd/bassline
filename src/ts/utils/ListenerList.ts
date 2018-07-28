export class ListenerList<T> {
	private listeners: ((event: T) => void)[] = [];
	
	public add(listener: (event: T) => void): void {
		this.listeners.push(listener);
	}
	
	public remove(listener: (event: T) => void): void {
		this.listeners.splice(this.listeners.indexOf(listener), 1);
	}
	
	public fire(): void {
		this.fireWith(null);
	}
	
	public fireWith(event: T): void {
		this.listeners.forEach(it => it(event));
	}
}
