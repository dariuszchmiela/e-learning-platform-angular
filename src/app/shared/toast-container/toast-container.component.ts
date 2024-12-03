import { Component } from '@angular/core';
import { Toast } from '../../models/toast.model';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [ToastComponent, CommonModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
})
export class ToastContainerComponent {
  toasts: Toast[] = [];

  addToast(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    duration: number = 3000
  ) {
    const id = Date.now();
    this.toasts.push({ id, message, type, duration });

    setTimeout(() => this.removeToast(id), duration);
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }
}
