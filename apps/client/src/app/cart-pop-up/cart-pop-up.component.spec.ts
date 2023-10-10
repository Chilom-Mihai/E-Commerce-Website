import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPopUpComponent } from './cart-pop-up.component';

describe('CartPopUpComponent', () => {
  let component: CartPopUpComponent;
  let fixture: ComponentFixture<CartPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartPopUpComponent]
    });
    fixture = TestBed.createComponent(CartPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
