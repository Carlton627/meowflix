import { NgClass } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [NgClass],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
    public toast = inject(ToastService);

    @Input() message: string = '';
    @Input() type: string = '';

    toastIconColor: string = '';
    toastTitle: string = '';

    ngOnInit(): void {
        [this.toastIconColor, this.toastTitle] = this.getToastConfig();
    }

    getToastConfig() {
        switch (this.type) {
            case 'error':
                return ['icon-error', 'Error'];
            case 'success':
                return ['icon-success', 'Success'];
            case 'info':
                return ['icon-info', 'Notification'];
            case 'warning':
                return ['icon-warning', 'Warning'];
            default:
                return ['icon-info', 'Notification'];
        }
    }
}
