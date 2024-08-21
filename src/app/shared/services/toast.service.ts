import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ToastMessage {
    message: string;
    type: string;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private toastSubject = new BehaviorSubject<ToastMessage | null>(null);

    toast$ = this.toastSubject.asObservable();

    showToast(message: string, type: string, timeoutMs = 3000) {
        this.toastSubject.next({ message, type });
        setTimeout(() => {
            this.clearToast();
        }, timeoutMs);
    }

    clearToast() {
        this.toastSubject.next(null);
    }
}
