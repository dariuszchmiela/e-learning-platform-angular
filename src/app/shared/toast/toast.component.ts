import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnChanges {
  @Input()
  message: string = '';
  @Input()
  type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input()
  duration: number = 3000;

  visible: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && this.message) {
      this.show();
    }
  }

  private show() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  }

  close() {
    this.visible = false;
  }
}
