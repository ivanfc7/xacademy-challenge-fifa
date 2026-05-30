import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSalirComponent } from './option-salir.component';

describe('OptionSalirComponent', () => {
  let component: OptionSalirComponent;
  let fixture: ComponentFixture<OptionSalirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionSalirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionSalirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
