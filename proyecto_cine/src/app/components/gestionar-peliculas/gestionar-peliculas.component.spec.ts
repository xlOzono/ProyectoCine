import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPeliculasComponent } from './gestionar-peliculas.component';

describe('GestionarPeliculasComponent', () => {
  let component: GestionarPeliculasComponent;
  let fixture: ComponentFixture<GestionarPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarPeliculasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
