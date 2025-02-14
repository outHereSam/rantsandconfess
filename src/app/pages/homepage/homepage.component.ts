import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { EpisodesService } from '../../core/services/episodes.service';
import { ThemeService } from '../../core/services/theme.service';
import { LatestEpisodeComponent } from '../../components/latest-episode/latest-episode.component';
import { Episode } from '../../core/models/Episode.model';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    LatestEpisodeComponent,
    EpisodeCardComponent,
    RouterLink,
    FooterComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.sass',
})
export class HomepageComponent implements OnInit {
  recentEpisodes!: Episode[];

  constructor(
    private episodesService: EpisodesService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.episodesService.getRecentEpisodes(3).subscribe({
      next: (data) => {
        this.recentEpisodes = data;
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      },
    });
  }
}
