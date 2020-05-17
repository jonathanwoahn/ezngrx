import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzngrxComponent } from './ezngrx.component';

describe('EzngrxComponent', () => {
  let component: EzngrxComponent;
  let fixture: ComponentFixture<EzngrxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzngrxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzngrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
