import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListingComponent } from './movie-listing.component';

describe('MovieListingComponent', () => {
  let component: MovieListingComponent;
  let fixture: ComponentFixture<MovieListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
