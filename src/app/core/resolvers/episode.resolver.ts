import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { EpisodesService } from '../services/episodes.service';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Episode } from '../models/Episode.model';
import { catchError } from 'rxjs/operators';

export const episodeResolver: ResolveFn<Episode | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  episodesService: EpisodesService = inject(EpisodesService)
): Observable<Episode | undefined> => {
  const idParam = route.paramMap.get('id');

  if (!idParam) {
    console.error('No episode ID provided in route');
    return of(undefined);
  }

  const id = Number(idParam);

  if (isNaN(id)) {
    console.error(`Invalid episode ID: ${idParam}`);
    return of(undefined);
  }

  return episodesService.getEpisodeById(id).pipe(
    catchError((error) => {
      console.error(`Failed to load episode ${id}:`, error);
      return of(undefined);
    })
  );
};
