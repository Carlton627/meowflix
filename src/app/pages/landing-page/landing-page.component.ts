import { Component, inject } from '@angular/core';
import { UtilService } from '../../shared/services/util.service';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
    public util = inject(UtilService);
}
