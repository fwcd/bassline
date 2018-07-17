import { Observable } from "./Observable";

export class TwoWayObservable<T> {
	private intended: Observable<T>;
	private actual: Observable<T>;
	
	public constructor(initialActualValue?: T) {
		this.intended = new Observable();
		this.actual = new Observable(initialActualValue);
	}
	
	public request(intended: T): void {
		this.intended.set(intended);
	}
	
	public poll(): T {
		return this.intended.get();
	}
	
	public pollListen(listener: (inteded: T) => void): void {
		this.intended.listen(listener);
	}
	
	public update(value: T): void {
		this.actual.set(value);
	}
	
	public listen(listener: (actual: T) => void): void {
		this.actual.listen(listener);
	}
	
	public get(): T {
		return this.actual.get();
	}
	
	public orElse(defaultValue: T): T {
		return this.actual.orElse(defaultValue);
	}
}
