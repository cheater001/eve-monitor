import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGangPageComponent } from './view-gang-page.component';

describe('ViewGangPageComponent', () => {
  let component: ViewGangPageComponent;
  let fixture: ComponentFixture<ViewGangPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGangPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGangPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
