import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JichiSelectComponent } from './jichi-select.component';

describe('JichiSelectComponent', () => {
  let component: JichiSelectComponent;
  let fixture: ComponentFixture<JichiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JichiSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JichiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
