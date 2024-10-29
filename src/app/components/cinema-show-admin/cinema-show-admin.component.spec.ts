import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaShowAdminComponent } from './cinema-show-admin.component';

describe('CinemaShowAdminComponent', () => {
  let component: CinemaShowAdminComponent;
  let fixture: ComponentFixture<CinemaShowAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaShowAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaShowAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
