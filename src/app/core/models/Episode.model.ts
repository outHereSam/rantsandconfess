export interface Episode {
  id: number;
  title: string;
  description: string;
  image_url: string;
  audio_url: string;
  duration: string;
  posted_on: string; // e.g. "YYYY-MM-DD"
  season: number;
  episode: number;
  spotify_url: string;
  apple_podcasts_url: string;
  featured: number; // You can also use boolean if you prefer (true/false)
  slug: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
