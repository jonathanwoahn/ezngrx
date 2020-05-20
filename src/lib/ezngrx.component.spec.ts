import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzngrxComponent } from './ezngrx.component';
import { EzngrxModule } from './ezngrx.module';
import { DynamicStoreConfig } from './ezngrx.models';

const config: DynamicStoreConfig = {
  entities: [
    { entity: 'Todo', },
  ],
  providers: [],
};


describe('EzngrxComponent', () => {
  let component: EzngrxComponent;
  let fixture: ComponentFixture<EzngrxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzngrxComponent ],
      imports: [
        EzngrxModule.forRoot(config),
      ],
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
