
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Article, Submission } from '../types';
import { MOCK_ARTICLES } from '../constants';

interface JournalContextType {
  articles: Article[];
  submissions: Submission[];
  addSubmission: (submission: Submission) => void;
  getArticleById: (id: string) => Article | undefined;
  searchArticles: (query: string) => Article[];
  getRelatedArticles: (currentArticleId: string, keywords: string[]) => Article[];
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles] = useState<Article[]>(MOCK_ARTICLES);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const addSubmission = (submission: Submission) => {
    setSubmissions((prev) => [...prev, submission]);
  };

  const getArticleById = (id: string) => {
    return articles.find((a) => a.id === id);
  };

  const searchArticles = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(lowerQuery) ||
        a.abstract.toLowerCase().includes(lowerQuery) ||
        a.authors.some((author) => author.toLowerCase().includes(lowerQuery)) ||
        a.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
    );
  };

  const getRelatedArticles = (currentArticleId: string, keywords: string[]) => {
    if (!keywords || keywords.length === 0) return [];
    
    return articles.filter(article => {
      if (article.id === currentArticleId) return false;
      // Check for overlapping keywords
      const overlap = article.keywords.some(k => 
        keywords.some(currK => currK.toLowerCase() === k.toLowerCase())
      );
      return overlap;
    }).slice(0, 3); // Return max 3 related articles
  };

  return (
    <JournalContext.Provider value={{ articles, submissions, addSubmission, getArticleById, searchArticles, getRelatedArticles }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
