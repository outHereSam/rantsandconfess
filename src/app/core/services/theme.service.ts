import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);

  theme = signal<Theme>('light');

  constructor() {
    this.initializeTheme();

    effect(() => {
      const currentTheme = this.theme();
      this.document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
    });
  }

  private initializeTheme(): void {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      this.theme.set(storedTheme);
      return;
    }

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark').matches
    ) {
      this.theme.set('dark');
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.theme.set(e.matches ? 'dark' : 'light');
        }
      });
  }

  toggleTheme(): void {
    this.theme.update((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light'
    );
  }
}
