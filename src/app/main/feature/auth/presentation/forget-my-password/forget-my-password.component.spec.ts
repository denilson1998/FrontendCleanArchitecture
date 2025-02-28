import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetMyPasswordComponent } from './forget-my-password.component';

describe('ForgetMyPasswordComponent', () => {
  let component: ForgetMyPasswordComponent;
  let fixture: ComponentFixture<ForgetMyPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetMyPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetMyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
