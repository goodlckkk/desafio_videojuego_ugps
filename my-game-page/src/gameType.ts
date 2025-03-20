export type Game = {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: any[];
  released: Date;
  tba: boolean;
  updated: Date;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  reactions: { [key: string]: number };
  added: number;
  added_by_status: AddedByStatus;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: any[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game: null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: ParentPlatform[];
  platforms: PlatformElement[];
  stores: Store[];
  developers: Developer[];
  genres: Developer[];
  tags: Developer[];
  publishers: Developer[];
  esrb_rating: EsrbRating;
  clip: Clip;
  description_raw: string;
};

export type AddedByStatus = {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
};

export type Clip = {
  clip: string;
  clips: Clips;
  video: string;
  preview: string;
};

export type Clips = {
  "320": string;
  "640": string;
  full: string;
};

export type Developer = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  domain?: string;
  language?: string;
};

export type EsrbRating = {
  id: number;
  name: string;
  slug: string;
};

export type ParentPlatform = {
  platform: EsrbRating;
};

export type PlatformElement = {
  platform: PlatformPlatform;
  released_at: Date;
  requirements: Requirements;
};

export type PlatformPlatform = {
  id: number;
  name: string;
  slug: string;
  image: null;
  year_end: null;
  year_start: null;
  games_count: number;
  image_background: string;
};

export type Requirements = {};

export type Rating = {
  id: number;
  title: string;
  count: number;
  percent: number;
};

export type Store = {
  id: number;
  url: string;
  store: Developer;
};
