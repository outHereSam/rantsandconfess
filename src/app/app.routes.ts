import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/homepage/homepage.component').then(
        (c) => c.HomepageComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'episodes',
    loadComponent: () =>
      import('./pages/episodes/episodes.component').then(
        (c) => c.EpisodesComponent
      ),
  },
  {
    path: 'episodes/:id',
    loadComponent: () =>
      import('./pages/episode-detail/episode-detail.component').then(
        (c) => c.EpisodeDetailComponent
      ),
  },
];
