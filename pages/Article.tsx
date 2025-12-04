
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJournal } from '../context/JournalContext';
import { Article as ArticleType } from '../types';
import SEO from '../components/SEO';
import { JOURNAL_ACRONYM } from '../constants';
import { generateArticleSummary } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Quote, Share2, Sparkles, BookOpen, Layers, X } from 'lucide-react';

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getArticleById, getRelatedArticles } = useJournal();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleType | undefined>(undefined);
  const [relatedArticles, setRelatedArticles] = useState<ArticleType[]>([]);
  const [activeTab, setActiveTab] = useState<'abstract' | 'references'>('abstract');
  const [showCitationModal, setShowCitationModal] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getArticleById(id);
      if (found) {
        setArticle(found);
        setRelatedArticles(getRelatedArticles(found.id, found.keywords));
        window.scrollTo(0, 0);
        setAiSummary(null); // Reset summary on new article
      }
    }
  }, [id, getArticleById, getRelatedArticles]);

  const handleAiSummarize = async () => {
    if (!article) return;
    setIsSummarizing(true);
    const summary = await generateArticleSummary(article.abstract + " " + (article.content || ""));
    setAiSummary(summary);
    setIsSummarizing(false);
  };

  if (!article) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-polyBlue"></div>
    </div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <SEO title={article.title} description={article.abstract} keywords={article.keywords} type="article" />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 text-xs text-gray-500 flex items-center overflow-x-auto whitespace-nowrap">
            <span className="cursor-pointer hover:text-polyBlue" onClick={() => navigate('/')}>Home</span>
            <span className="mx-2">/</span>
            <span className="cursor-pointer hover:text-polyBlue" onClick={() => navigate('/archives')}>Vol {article.volume}, Issue {article.issue}</span>
            <span className="mx-2">/</span>
            <span className="font-semibold text-gray-700 truncate">{article.title}</span>
          </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content */}
            <main className="lg:col-span-8">
                <div className="bg-white p-6 md:p-10 rounded-2xl border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-polyGold"></div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-polyBlue bg-blue-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Original Research</span>
                        <span className="text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div> Open Access
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 text-sm text-gray-700 mb-6">
                        {article.authors.map((author, idx) => (
                            <span key={idx} className="font-medium bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer transition">
                                {author}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-6">
                        <div className="flex flex-col">
                           <span className="text-xs uppercase text-gray-400 font-bold">Published</span>
                           <span className="font-medium text-gray-800">{new Date(article.publicationDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <div className="flex flex-col">
                           <span className="text-xs uppercase text-gray-400 font-bold">DOI</span>
                           <a href={`https://doi.org/${article.doi}`} className="font-medium text-polyBlue hover:underline">{article.doi}</a>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
                    <button 
                       onClick={() => setActiveTab('abstract')}
                       className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition ${activeTab === 'abstract' ? 'border-polyBlue text-polyBlue' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                       Abstract
                    </button>
                    <button 
                       onClick={() => setActiveTab('references')}
                       className={`pb-3 text-sm font-bold uppercase tracking-wide border-b-2 transition ${activeTab === 'references' ? 'border-polyBlue text-polyBlue' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                       References
                    </button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'abstract' && (
                    <motion.div 
                      key="abstract"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
                    >
                        <p className="text-gray-800 leading-relaxed text-lg text-justify font-light">
                            {article.abstract}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-2">
                            {article.keywords.map(k => (
                                <span key={k} className="bg-blue-50 text-polyBlue px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                                    #{k}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                  )}
                  
                  {activeTab === 'references' && (
                    <motion.div 
                      key="references"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
                    >
                        <ul className="space-y-4">
                            {article.references?.map((ref, i) => (
                                <li key={i} className="text-sm text-gray-700 pl-4 border-l-2 border-gray-200">
                                    {ref}
                                </li>
                            )) || <p>No references found.</p>}
                        </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
                
                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                   <a 
                     href={article.pdfUrl || '#'} 
                     target="_blank"
                     className="col-span-2 bg-polyBlue text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:bg-blue-900 transition transform hover:-translate-y-0.5"
                   >
                      <Download size={20} /> Download PDF
                   </a>
                   <button onClick={() => setShowCitationModal(!showCitationModal)} className="bg-white border border-gray-200 text-gray-700 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50">
                      <Quote size={18} /> Cite
                   </button>
                   <button className="bg-white border border-gray-200 text-gray-700 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50">
                      <Share2 size={18} /> Share
                   </button>
                </div>
                
                {showCitationModal && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-gray-100 p-4 rounded-lg text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-700">APA Citation</span>
                        <X size={14} className="cursor-pointer" onClick={() => setShowCitationModal(false)} />
                      </div>
                      <div className="bg-white p-2 rounded border text-xs font-mono text-gray-600 select-all">
                        {article.authors.join(', ')} ({new Date(article.publicationDate).getFullYear()}). {article.title}. {JOURNAL_ACRONYM}, {article.volume}({article.issue}).
                      </div>
                  </motion.div>
                )}

                {/* AI Assistant Card */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                       <Sparkles size={64} className="text-indigo-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                       <div className="bg-white p-1.5 rounded-full shadow-sm text-indigo-600">
                         <Sparkles size={16} />
                       </div>
                       <h3 className="font-bold text-indigo-900">AI Research Assistant</h3>
                    </div>
                    
                    {!aiSummary ? (
                       <div className="text-center py-4">
                          <p className="text-sm text-indigo-700 mb-4">Too busy? Get a 150-word breakdown of this paper's key findings.</p>
                          <button 
                            onClick={handleAiSummarize}
                            disabled={isSummarizing}
                            className="bg-white text-indigo-600 font-bold text-sm px-4 py-2 rounded-lg shadow-sm hover:shadow transition flex items-center justify-center w-full gap-2"
                          >
                             {isSummarizing ? 'Analyzing...' : 'Generate Summary'}
                          </button>
                       </div>
                    ) : (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/60 p-3 rounded-lg text-sm text-indigo-900 leading-relaxed border border-indigo-100">
                          {aiSummary}
                       </motion.div>
                    )}
                </div>

                {/* Metrics */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Impact Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                           <span className="block text-2xl font-bold text-gray-900">{article.views}</span>
                           <span className="text-xs text-gray-500 font-medium">Views</span>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                           <span className="block text-2xl font-bold text-gray-900">{article.downloads}</span>
                           <span className="text-xs text-gray-500 font-medium">Downloads</span>
                        </div>
                    </div>
                </div>

            </aside>
        </div>
      </div>
    </div>
  );
};

export default Article;
