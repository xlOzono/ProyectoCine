import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaseatsComponent } from './cinemaseats.component';

describe('CinemaseatsComponent', () => {
  let component: CinemaseatsComponent;
  let fixture: ComponentFixture<CinemaseatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaseatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaseatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
