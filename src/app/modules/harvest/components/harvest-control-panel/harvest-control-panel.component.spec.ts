import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestControlPanelComponent } from './harvest-control-panel.component';

describe('HarvestControlPanelComponent', () => {
  let component: HarvestControlPanelComponent;
  let fixture: ComponentFixture<HarvestControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarvestControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HarvestControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
