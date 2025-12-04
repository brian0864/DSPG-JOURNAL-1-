import React from 'react';
import { useJournal } from '../context/JournalContext';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { JOURNAL_ACRONYM } from '../constants';

const Archives: React.FC = () => {
  const { articles } = useJournal();
  const navigate = useNavigate();

  // Group articles by volume/issue logic simulation
  const years = [2024, 2023]; 

  return (
    <div className="container mx-auto px-4 py-12">
      <SEO title="Archives" description={`Browse past issues and publications of ${JOURNAL_ACRONYM}.`} />
      
      <h1 className="text-3xl font-serif font-bold text-polyBlue mb-8">Archives</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {years.map(year => (
          <div key={year} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-polyBlue text-white px-6 py-4">
                <h2 className="text-xl font-bold">{year} Issues</h2>
             </div>
             <div className="p-6">
                <div className="mb-6">
                   <h3 className="font-bold text-gray-800 mb-2">Volume {year === 2024 ? 12 : 11}, Issue 1</h3>
                   <ul className="space-y-2 text-sm">
                     {articles.filter(a => a.publicationDate.includes(year.toString())).map(article => (
                       <li key={article.id}>
                         <button onClick={() => navigate(`/article/${article.id}`)} className="text-left text-polyBlue hover:text-polyGold hover:underline line-clamp-2">
                           {article.title}
                         </button>
                       </li>
                     ))}
                   </ul>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archives;