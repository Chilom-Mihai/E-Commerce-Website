import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHseComponent } from './header-hse.component';

describe('HeaderHseComponent', () => {
  let component: HeaderHseComponent;
  let fixture: ComponentFixture<HeaderHseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderHseComponent]
    });
    fixture = TestBed.createComponent(HeaderHseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
