export interface RSSResponse {
  title: string;
  link: string;
  description: string;
  items: RSSItem[];
}

export interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid: string;
}
