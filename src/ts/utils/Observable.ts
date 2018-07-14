import { ListenerList } from "./ListenerList";

export class Observable<T> {
	private value: T;
	private listeners = new ListenerList<T>();
	
	public constructor(value: T) {
		this.value = value;
	}
	
	public get(): T {
		return this.value;
	}
	
	public set(value: T): void {
		this.value = value;
		this.listeners.fireWith(value);
	}
	
	public listen(listener: (newValue: T) => void): void {
		this.listeners.listen(listener);
		listener(this.value);
	}
}
