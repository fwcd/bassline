import { ListenerList } from "./ListenerList";

export class Observable<T> {
	private value?: T;
	private listeners = new ListenerList<T>();
	
	public constructor(value?: T) {
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
		if (this.value) {
			// Fire this listener once upon adding if
			// the value is present already.
			listener(this.value);
		}
	}
}
