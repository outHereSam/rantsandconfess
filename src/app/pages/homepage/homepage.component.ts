import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { EpisodesService } from '../../core/services/episodes.service';
import { ThemeService } from '../../core/services/theme.service';
import { LatestEpisodeComponent } from '../../components/latest-episode/latest-episode.component';
import { Episode } from '../../core/models/Episode.model';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, LatestEpisodeComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.sass',
})
export class HomepageComponent implements OnInit {
  episodes!: Episode[];

  constructor(
    private episodesService: EpisodesService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.episodesService.getEpisodes().subscribe({
      next: (data) => {
        this.episodes = data;
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      },
    });
  }
}
