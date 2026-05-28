import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerModalSkillsComponent } from './player-modal-skills.component';

describe('PlayerModalSkillsComponent', () => {
  let component: PlayerModalSkillsComponent;
  let fixture: ComponentFixture<PlayerModalSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerModalSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerModalSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
