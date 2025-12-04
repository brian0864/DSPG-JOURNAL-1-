
export enum UserRole {
  GUEST = 'GUEST',
  AUTHOR = 'AUTHOR',
  EDITOR = 'EDITOR',
  REVIEWER = 'REVIEWER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  institution?: string;
}

export interface Article {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  publicationDate: string;
  volume: number;
  issue: number;
  keywords: string[];
  doi: string;
  views: number;
  downloads: number;
  citations: number;
  content?: string;
  pdfUrl?: string;
  references: string[];
}

export type SubmissionStatus = 'draft' | 'submitted' | 'under_review' | 'revision_required' | 'accepted' | 'rejected';

export interface Submission {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  email: string;
  abstract: string;
  status: SubmissionStatus;
  submittedAt: string;
  lastUpdated: string;
  keywords: string[];
  fileUrl?: string;
}

export interface PlagiarismResult {
  score: number;
  similarityPercentage: number;
  analysis: string;
  flaggedSections: Array<{
    text: string;
    reason: string;
  }>;
}

export interface EditorialMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  image?: string;
}
