import { Component, Input } from '@angular/core';
import { Episode } from '../../core/models/Episode.model';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-episode',
  standalone: true,
  imports: [CommonModule, AudioPlayerComponent],
  templateUrl: './latest-episode.component.html',
  styleUrl: './latest-episode.component.sass',
})
export class LatestEpisodeComponent {
  @Input() latestEpisode: Episode | undefined;

  ngOnInit(): void {}
}
