import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { EpisodesService } from '../../core/services/episodes.service';
import { Episode } from '../../core/models/Episode.model';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, EpisodeCardComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.sass',
})
export class EpisodesComponent implements OnInit {
  episodesService = inject(EpisodesService);
  episodes: Episode[] = [];

  ngOnInit(): void {
    this.episodesService.getEpisodes().subscribe({
      next: (episodes) => (this.episodes = episodes),
      error: (error) => console.error('Failed to fetch episodes:', error),
    });
  }
}
