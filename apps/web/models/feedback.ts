export interface Feedback {
  id: number;
  name: string;
  email: string;
  score: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export enum FeedbackSortBy {
  DESCENDING_SCORE = 'DESCENDING_SCORE',
  ASCENDING_SCORE = 'ASCENDING_SCORE',
  LATEST_DATE = 'LATEST_DATE',
  OLDEST_DATE = 'OLDEST_DATE'
}
