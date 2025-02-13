import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Episode } from '../../core/models/Episode.model';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.sass',
})
export class AudioPlayerComponent implements AfterViewInit {
  @Input() episode!: Episode | undefined;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  isPlaying = false;
  currentTime = 0;
  duration = 0;

  ngAfterViewInit(): void {
    const audio = this.audioPlayer.nativeElement;

    audio.addEventListener('loadedmetadata', () => {
      this.duration = audio.duration;
    });

    audio.addEventListener('timeupdate', () => {
      this.currentTime = audio.currentTime;
    });
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.audioPlayer.nativeElement.play();
    } else {
      this.audioPlayer.nativeElement.pause();
    }
  }

  onProgressChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.audioPlayer.nativeElement.currentTime = value;
    this.currentTime = value;
  }

  skipBackward(seconds: number): void {
    this.audioPlayer.nativeElement.currentTime = Math.max(
      this.audioPlayer.nativeElement.currentTime - seconds,
      0
    );
  }

  skipForward(seconds: number): void {
    this.audioPlayer.nativeElement.currentTime = Math.min(
      this.audioPlayer.nativeElement.currentTime + seconds,
      this.duration
    );
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return minutes + ':' + (secs < 10 ? '0' : '') + secs;
  }
}
