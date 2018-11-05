import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reset2Component } from './reset2.component';

describe('Reset2Component', () => {
  let component: Reset2Component;
  let fixture: ComponentFixture<Reset2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reset2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reset2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
