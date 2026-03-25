export type Rubrique = 'mecanismes' | 'terrain' | 'heritage' | 'radar';

export interface ArticleMetadata {
  title: string;
  shortTitle?: string;
  slug: string;
  rubrique: Rubrique;
  date: string; // YYYY-MM-DD
  resume: string;
  tags: string[];
  status: 'draft' | 'published';
  articleNumber: string;
  coverImage?: string;
  // Généré dynamiquement :
  readingTime?: number;
}

export interface Article extends ArticleMetadata {
  content: string;
}
