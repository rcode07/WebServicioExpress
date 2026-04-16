import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationSaveCustomerComponent } from './confirmation-save-customer.component';

describe('ConfirmationSaveCustomerComponent', () => {
  let component: ConfirmationSaveCustomerComponent;
  let fixture: ComponentFixture<ConfirmationSaveCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationSaveCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationSaveCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
