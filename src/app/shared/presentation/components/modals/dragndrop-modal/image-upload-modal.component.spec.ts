import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragndropModalComponent } from './image-upload-modal.component';

describe('DragndropModalComponent', () => {
  let component: DragndropModalComponent;
  let fixture: ComponentFixture<DragndropModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragndropModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragndropModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
