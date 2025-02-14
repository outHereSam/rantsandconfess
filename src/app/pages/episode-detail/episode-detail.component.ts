import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Episode } from '../../core/models/Episode.model';
import { EpisodesService } from '../../core/services/episodes.service';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from '../../components/audio-player/audio-player.component';
import { EpisodeCardComponent } from '../../components/episode-card/episode-card.component';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    AudioPlayerComponent,
    EpisodeCardComponent,
    EpisodeCardComponent,
  ],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.sass',
})
export class EpisodeDetailComponent {
  private readonly route = inject(ActivatedRoute);
  episodesService = inject(EpisodesService);
  episode!: Episode | undefined;
  lastEpisodes: Episode[] = [];

  ngOnInit() {
    const episodeId = this.route.snapshot.paramMap.get('id');
    this.episodesService.getEpisodeById(Number(episodeId)).subscribe({
      next: (episode) => (this.episode = episode),
      error: (error) => console.error('Episode not found:', error),
    });
    this.episodesService.getLastRecentEpisodes(Number(episodeId)).subscribe({
      next: (episodes) => (this.lastEpisodes = episodes),
      error: (error) => console.error('Failed to get last episodes:', error),
    });
  }
}
