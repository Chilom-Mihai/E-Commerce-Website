import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProductDetailComponent } from './header-product-detail.component';

describe('HeaderProductDetailComponent', () => {
  let component: HeaderProductDetailComponent;
  let fixture: ComponentFixture<HeaderProductDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderProductDetailComponent]
    });
    fixture = TestBed.createComponent(HeaderProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
