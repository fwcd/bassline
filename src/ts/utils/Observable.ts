import { ListenerList } from "./ListenerList";
import { NoSuchElementException } from "./NoSuchElementException";

export class Observable<T> {
	private value?: T;
	private listeners = new ListenerList<T>();
	
	public constructor(value?: T) {
		this.value = value;
	}
	
	public get(): T {
		this.assertPresent();
		return this.value;
	}
	
	public assertPresent(): void {
		if (!this.isPresent()) {
			throw <NoSuchElementException>{
				message: "Tried to get non-present value"
			};
		}
	}
	
	public isPresent(): boolean {
		if (this.value) { return true; } else { return false; }
	}
	
	public fire(): void {
		this.listeners.fireWith(this.value);
	}
	
	public use(consumer: (value: T) => void): void {
		this.assertPresent();
		consumer(this.value);
		this.fire();
	}
	
	public set(value: T): void {
		this.value = value;
		this.fire();
	}
	
	public listen(listener: (newValue: T) => void): void {
		this.listeners.add(listener);
		if (this.value) {
			// Fire this listener once upon adding if
			// the value is present already.
			listener(this.value);
		}
	}
	
	public unlisten(listener: (newValue: T) => void): void {
		this.listeners.remove(listener);
	}
	
	public derive<R>(mapper: (value: T) => R): Observable<R> {
		let result = new Observable<R>();
		this.listen(value => result.set(mapper(value)));
		return result;
	}
	
	public deriveAsync<R>(mapper: (value: T, self: Observable<R>) => void): Observable<R> {
		let result = new Observable<R>();
		this.listen(value => mapper(value, result));
		return result;
	}
	
	public orElse(defaultValue: T): T {
		if (this.isPresent()) {
			return this.value;
		} else {
			return defaultValue;
		}
	}
}
