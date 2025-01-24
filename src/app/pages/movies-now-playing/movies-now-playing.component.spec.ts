import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesNowPlayingComponent } from './movies-now-playing.component';

describe('MoviesNowPlayingComponent', () => {
  let component: MoviesNowPlayingComponent;
  let fixture: ComponentFixture<MoviesNowPlayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesNowPlayingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesNowPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
