import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoViewPageComponent } from './video-view-page.component';

describe('VideoViewPageComponent', () => {
    let component: VideoViewPageComponent;
    let fixture: ComponentFixture<VideoViewPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [VideoViewPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(VideoViewPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
