import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SubscriberService {
	
	loader_subject = new Subject<any>();
	toast_subject = new Subject<any>();

	constructor() { }

	set_loader(flag: boolean): void {
		this.loader_subject.next(flag);
	}

	get_loader(): Observable<any> {
		return this.loader_subject.asObservable();
	}

	set_toaster(type: string, message: string): void {
		this.toast_subject.next({ type, message });
	}

	get_toaster(): Observable<any> {
		return this.toast_subject.asObservable();
	}
}
