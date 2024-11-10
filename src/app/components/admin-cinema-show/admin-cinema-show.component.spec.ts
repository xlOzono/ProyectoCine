import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCinemaShowComponent } from './admin-cinema-show.component';

describe('AdminCinemaShowComponent', () => {
  let component: AdminCinemaShowComponent;
  let fixture: ComponentFixture<AdminCinemaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCinemaShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCinemaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
