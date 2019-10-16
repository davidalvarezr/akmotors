import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageAdsComponent } from './admin-manage-ads.component';

describe('AdminManageAdsComponent', () => {
  let component: AdminManageAdsComponent;
  let fixture: ComponentFixture<AdminManageAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
