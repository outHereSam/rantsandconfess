import { Routes } from '@angular/router';
import { episodeResolver } from './core/resolvers/episode.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/homepage/homepage.component').then(
        (c) => c.HomepageComponent
      ),
    title: 'Welcome | Rants and Confessions',
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
    title: 'Episodes | Rants and Confessions',
  },
  {
    path: 'episodes/:id',
    loadComponent: () =>
      import('./pages/episode-detail/episode-detail.component').then(
        (c) => c.EpisodeDetailComponent
      ),
    title: 'Episodes | Rants and Confessions',
    // resolve: {
    //   episode: episodeResolver,
    // },
    // title: (route) => `${route.data['episode'].title}`,
  },
  {
    path: 'confess',
    loadComponent: () =>
      import('./pages/confess/confess.component').then(
        (c) => c.ConfessComponent
      ),
    title: 'Confess | Rants and Confessions',
  },
];
