import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JichiTextComponent } from './jichi-text.component';

describe('JichiTextComponent', () => {
  let component: JichiTextComponent;
  let fixture: ComponentFixture<JichiTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JichiTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JichiTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
