import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestEpisodeComponent } from './latest-episode.component';

describe('LatestEpisodeComponent', () => {
  let component: LatestEpisodeComponent;
  let fixture: ComponentFixture<LatestEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestEpisodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
