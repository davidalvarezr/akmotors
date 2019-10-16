import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAdComponent } from './admin-add-ad.component';

describe('AdminAddAdComponent', () => {
  let component: AdminAddAdComponent;
  let fixture: ComponentFixture<AdminAddAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
