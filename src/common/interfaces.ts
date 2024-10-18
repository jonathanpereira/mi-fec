export interface Category {
  id: number;
  name: string;
}

export interface Format {
  res: string;
  size: number;
}

export interface Formats {
  [key: string]: Format;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  releaseDate: string;
  formats: Formats;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  authorId: number;
  categories: string[];
  format: string;
  releaseDate: string;
}
