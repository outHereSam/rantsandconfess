import { Component, Input } from '@angular/core';
import { Episode } from '../../core/models/Episode.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.sass',
})
export class EpisodeCardComponent {
  @Input() episode!: Episode;
}
