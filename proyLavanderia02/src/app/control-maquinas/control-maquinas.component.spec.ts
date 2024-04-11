import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMaquinasComponent } from './control-maquinas.component';

describe('ControlMaquinasComponent', () => {
  let component: ControlMaquinasComponent;
  let fixture: ComponentFixture<ControlMaquinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlMaquinasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlMaquinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
