import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaNuevaComponent } from './nota-nueva.component';

describe('NotaNuevaComponent', () => {
  let component: NotaNuevaComponent;
  let fixture: ComponentFixture<NotaNuevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaNuevaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
