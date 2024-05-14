import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcumuladoClienteComponent } from './acumulado-cliente.component';

describe('AcumuladoClienteComponent', () => {
  let component: AcumuladoClienteComponent;
  let fixture: ComponentFixture<AcumuladoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcumuladoClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcumuladoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
