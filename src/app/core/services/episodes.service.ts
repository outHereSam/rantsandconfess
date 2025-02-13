import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { Episode } from '../models/Episode.model';
import { environment } from '../../../environments/environment.development';
import * as xml2js from 'xml2js';
import { RSSResponse } from '../models/RssResponse.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  baseUrl = environment.apiUrl;
  apiUrl = 'v1/episodes';
  rssUrl = environment.rssUrl;

  constructor(private http: HttpClient) {}

  getEpisodes(): Observable<any[]> {
    return this.http.get(this.rssUrl, { responseType: 'text' }).pipe(
      map((xmlString: string) => {
        // Parse the XML
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlString, 'text/xml');

        // Collect all <item> elements
        const items = Array.from(doc.querySelectorAll('item'));

        // Convert each <item> into the desired JSON structure
        return items.map((item, index) => this.mapItemToJson(item, index + 1));
      })
    );
  }

  private mapItemToJson(item: Element, id: number): any {
    // 1. Basic fields
    const title = item.querySelector('title')?.textContent?.trim() || '';
    const description =
      item.querySelector('description')?.textContent?.trim() || '';
    const enclosureEl = item.querySelector('enclosure');
    const audioUrl = enclosureEl?.getAttribute('url') || '';

    // 2. Convert <pubDate> to YYYY-MM-DD
    const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
    const postedOn = pubDate
      ? new Date(pubDate).toISOString().split('T')[0]
      : '';

    // 3. iTunes namespace fields (using getElementsByTagNameNS)
    const itunesNS = 'http://www.itunes.com/dtds/podcast-1.0.dtd';

    const durationEls = item.getElementsByTagNameNS(itunesNS, 'duration');
    const seasonEls = item.getElementsByTagNameNS(itunesNS, 'season');
    const episodeEls = item.getElementsByTagNameNS(itunesNS, 'episode');
    const imageEls = item.getElementsByTagNameNS(itunesNS, 'image');

    const duration = durationEls.length
      ? durationEls[0].textContent?.trim()
      : '';
    // Ensure that we always get a string (defaulting to an empty string if null)
    const seasonStr = seasonEls.length
      ? seasonEls[0].textContent?.trim() || ''
      : '';
    const episodeStr = episodeEls.length
      ? episodeEls[0].textContent?.trim() || ''
      : '';

    // Convert to numbers safely (if the string is empty or not a number, it becomes 0)
    const seasonNumber = seasonStr ? parseInt(seasonStr, 10) : 0;
    const episodeNumber = episodeStr ? parseInt(episodeStr, 10) : 0;

    const itunesImage = imageEls.length
      ? imageEls[0].getAttribute('href') || ''
      : '';

    // 4. Example: Link as Spotify URL
    const spotifyUrl = item.querySelector('link')?.textContent?.trim() || '';
    const applePodcastsUrl = 'https://apple.com/example';

    // 5. Hard-coded or generated fields
    const featured = 1;
    const slug = this.generateSlug(title);

    // For created_at and updated_at, just reuse the pubDate in full ISO, or current date if missing
    const fullIsoDate = pubDate
      ? new Date(pubDate).toISOString()
      : new Date().toISOString();

    return {
      id: id,
      title: title,
      description: this.stripHtml(description), // optional
      image_url: itunesImage,
      audio_url: audioUrl,
      duration: duration,
      posted_on: postedOn,
      season: seasonNumber,
      episode: episodeNumber,
      spotify_url: spotifyUrl,
      apple_podcasts_url: applePodcastsUrl,
      featured: featured,
      slug: slug,
      created_at: fullIsoDate,
      updated_at: fullIsoDate,
    };
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
  }

  private stripHtml(html: string): string {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }
}
