import { User } from "firebase/auth";

import { ReactNode } from "react";

export interface FormInputProps {
    id: string;
    type: 'text' | 'email' | 'password';
    placeholder?: string;
    required?: boolean;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  

export interface Users{
  username: string,
  email: string,
  uid:string,
  profilePic?: string
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ProfileAvatarProps {
  profilePicUrl?: string;
  altText?: string;
}

export interface AuthProviderProps {
  children: ReactNode; // Include children prop
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  name?:string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Comment {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  avatar: string;
  mediaId: number;
  mediaType: 'movie' | 'tv';
  replies: Reply[];
}

export interface Reply {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  avatar: string;
}
export interface MovieDetails{
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  poster_path?: string;
  genres?: string[];
  mediaType: "movie" | "tv";
  comments?: Comment[];
}

export interface APIResponseMovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  created_by?: Array<{
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
  }>;
  episode_run_time?: number[];
  first_air_date?: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage?: string;
  id: number;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  };
  name?: string;
  next_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
  };
  networks?: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies?: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries?: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  seasons?: Array<{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }>;
  spoken_languages?: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  type?: string;
  vote_average: number;
  vote_count: number;
}

export interface ListsItem {
  id: number;
  mediaType: "movie" | "tv";
}

export interface StoreState {
  user: User | null;
  profilePic: string;
  username: string;
  uid: string;
  favourites: ListsItem[];
  watchlist: ListsItem[];
  setUser: (user: User | null) => void;
  setProfilePic: (profilePic: string) => void;
  setUsername: (username: string) => void;
  setUid: (uid: string) => void;
  addToFavourites: (item: ListsItem) => void;
  removeFromFavourites: (item: ListsItem) => void;
  addToWatchlist: (item: ListsItem) => void;
  removeFromWatchlist: (item: ListsItem) => void;
  resetFavourites: () => void;
  resetWatchlist: () => void;
}

export interface ListsItemProps {
  item: MovieDetails;
  listType: 'favourites' | 'watchlist';
}

export interface CommentSectionProps {
  commentCount?: number;
  mediaId: number;
  mediaType: "movie" | "tv";
}

export type Trailer = {
  iso_639_1: string;       // "en"
  iso_3166_1: string;      // "US"
  name: string;            // "\"Double Your Villains\" Featurette"
  key: string;             // "595kqDGsKXk"
  site: string;            // "YouTube"
  size: number;            // 1080
  type: string;            // "Behind the Scenes"
  official: boolean;       // true
  published_at: string;    // "2024-12-08T00:00:04.000Z"
  id: string;              // "6754f512f1829b66fbb4db5e"
};

export type TrailerResponse = {
  results: Trailer[]
}
