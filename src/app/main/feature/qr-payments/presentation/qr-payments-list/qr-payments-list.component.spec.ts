import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPaymentsListComponent } from './qr-payments-list.component';

describe('QrPaymentsListComponent', () => {
  let component: QrPaymentsListComponent;
  let fixture: ComponentFixture<QrPaymentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrPaymentsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrPaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
