import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicVideoChatComponent } from './basic-video-chat.component';

describe('BasicVideoChatComponent', () => {
    let component: BasicVideoChatComponent;
    let fixture: ComponentFixture<BasicVideoChatComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BasicVideoChatComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicVideoChatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
