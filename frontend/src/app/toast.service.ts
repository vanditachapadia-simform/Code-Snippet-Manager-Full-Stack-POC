import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new BehaviorSubject<{ message: string; type: ToastType; show: boolean }>({ message: '', type: 'info', show: false });
  toastState$ = this.toastSubject.asObservable();

  show(message: string, type: ToastType = 'info', duration = 3000) {
    this.toastSubject.next({ message, type, show: true });
    setTimeout(() => this.hide(), duration);
  }

  hide() {
    this.toastSubject.next({ ...this.toastSubject.value, show: false });
  }
}
