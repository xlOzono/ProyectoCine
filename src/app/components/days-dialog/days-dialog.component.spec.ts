import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysDialogComponent } from './days-dialog.component';

describe('DaysDialogComponent', () => {
  let component: DaysDialogComponent;
  let fixture: ComponentFixture<DaysDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
