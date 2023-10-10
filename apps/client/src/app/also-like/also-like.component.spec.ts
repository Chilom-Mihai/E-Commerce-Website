import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlsoLikeComponent } from './also-like.component';

describe('AlsoLikeComponent', () => {
  let component: AlsoLikeComponent;
  let fixture: ComponentFixture<AlsoLikeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlsoLikeComponent]
    });
    fixture = TestBed.createComponent(AlsoLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
