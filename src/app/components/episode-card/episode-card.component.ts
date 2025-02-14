import { Component, Input } from '@angular/core';
import { Episode } from '../../core/models/Episode.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.sass',
})
export class EpisodeCardComponent {
  @Input() episode!: Episode;
}
