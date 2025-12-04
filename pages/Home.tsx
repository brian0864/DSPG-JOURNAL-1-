
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJournal } from '../context/JournalContext';
import SEO from '../components/SEO';
import { JOURNAL_NAME, JOURNAL_ACRONYM, INDEXING_PARTNERS } from '../constants';

const Home: React.FC = () => {
  const { articles, searchArticles } = useJournal();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'recent' | 'popular'>('recent');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/archives?search=${searchQuery}`); // Simple redirection logic
  };

  // Sort articles based on tab
  const displayArticles = searchQuery 
    ? searchArticles(searchQuery)
    : activeTab === 'recent' 
        ? [...articles].sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime())
        : [...articles].sort((a, b) => b.downloads - a.downloads);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO 
        title="Home" 
        description={`Welcome to ${JOURNAL_NAME}. Explore cutting-edge research and academic publications from Delta State Polytechnic.`} 
      />

      {/* Hero Section */}
      <section className="bg-polyBlue text-white relative overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop" 
               alt="Academic Research Innovation" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-polyBlue via-polyBlue/95 to-blue-900/90 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col items-center text-center">
          <div className="bg-polyGold text-polyBlue text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider shadow-lg">
             Peer-Reviewed & Open Access
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight max-w-5xl drop-shadow-md">
            {JOURNAL_NAME}
          </h1>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto font-light drop-shadow-sm">
            An International Journal of Engineering, Science, Technology and Management.
          </p>
          
          {/* Main Search */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl flex shadow-2xl rounded-lg overflow-hidden bg-white p-1">
            <input 
              type="text" 
              placeholder="Search articles, DOIs, authors, or keywords..." 
              className="flex-grow px-6 py-4 text-gray-800 focus:outline-none placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-polyGold text-polyBlue font-bold px-8 py-4 hover:bg-yellow-400 transition-colors rounded-r-md"
            >
              Search
            </button>
          </form>
          
          <div className="mt-8 flex gap-4 text-sm font-medium">
             <a href="#" className="text-gray-300 hover:text-white underline decoration-polyGold">Advanced Search</a>
             <span className="text-gray-500">|</span>
             <a href="#" className="text-gray-300 hover:text-white underline decoration-polyGold">Author Guidelines</a>
          </div>
        </div>
      </section>

      {/* Indexing Strip */}
      <div className="bg-white border-b border-gray-200 py-6">
         <div className="container mx-auto px-4">
             <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4 font-semibold">Indexed & Abstracted In</p>
             <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {INDEXING_PARTNERS.map((partner, i) => (
                    <span key={i} className="text-lg md:text-xl font-bold font-serif text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-polyGold rounded-full mr-2"></span> {partner}
                    </span>
                ))}
             </div>
         </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Articles Feed */}
          <div className="lg:col-span-8">
             <div className="flex items-center justify-between mb-8 border-b border-gray-200">
                 <div className="flex space-x-8">
                     <button 
                       className={`pb-4 text-sm font-bold uppercase tracking-wide border-b-2 transition ${activeTab === 'recent' ? 'border-polyBlue text-polyBlue' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                       onClick={() => setActiveTab('recent')}
                     >
                       Recent Articles
                     </button>
                     <button 
                       className={`pb-4 text-sm font-bold uppercase tracking-wide border-b-2 transition ${activeTab === 'popular' ? 'border-polyBlue text-polyBlue' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                       onClick={() => setActiveTab('popular')}
                     >
                       Most Popular
                     </button>
                 </div>
                 <button onClick={() => navigate('/archives')} className="hidden md:block text-polyBlue text-sm font-semibold hover:underline">View All Issue</button>
             </div>
             
             <div className="space-y-6">
               {displayArticles.map(article => (
                 <article key={article.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-gray-500 font-mono">Vol {article.volume}, Issue {article.issue} • {new Date(article.publicationDate).getFullYear()}</span>
                      <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wide">Open Access</span>
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2 cursor-pointer group-hover:text-polyBlue transition-colors" onClick={() => navigate(`/article/${article.id}`)}>
                     {article.title}
                   </h3>
                   <div className="text-sm text-gray-600 mb-3">
                     {article.authors.join(", ")}
                   </div>
                   <div className="flex items-center space-x-4 text-xs text-gray-400 mt-4">
                       <span className="flex items-center"><svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg> {article.views}</span>
                       <span className="flex items-center"><svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"/></svg> {article.downloads}</span>
                       <span className="border border-gray-200 px-1 rounded text-[10px]">PDF</span>
                   </div>
                 </article>
               ))}
             </div>
             <div className="mt-8 text-center">
                <button onClick={() => navigate('/archives')} className="bg-white border border-polyBlue text-polyBlue px-6 py-2 rounded-full hover:bg-polyBlue hover:text-white transition font-medium text-sm">Load More Articles</button>
             </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Submit Box */}
            <div className="bg-polyBlue text-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="font-serif font-bold text-xl mb-2">Submit Your Paper</h3>
                <p className="text-sm text-blue-100 mb-4">Fast-track review process available. Get indexed in major databases.</p>
                <button onClick={() => navigate('/submit')} className="bg-polyGold text-polyBlue font-bold w-full py-3 rounded hover:bg-yellow-400 transition transform hover:scale-105">Submit Manuscript</button>
            </div>

            {/* Information Box */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 border-l-4 border-polyGold pl-3">Information</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-polyBlue hover:underline">For Authors</a></li>
                <li><a href="#" className="hover:text-polyBlue hover:underline">For Reviewers</a></li>
                <li><a href="#" className="hover:text-polyBlue hover:underline">Call for Papers (Special Issue)</a></li>
                <li><a href="#" className="hover:text-polyBlue hover:underline">Article Processing Charges</a></li>
              </ul>
            </div>

            {/* Editor's Pick / News */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 border-l-4 border-polyGold pl-3">Journal News</h3>
              <div className="space-y-4">
                <div className="pb-2">
                   <span className="text-xs text-polyGold font-bold">NEW</span>
                   <h4 className="font-bold text-sm text-gray-800 leading-snug">Impact Factor Updated</h4>
                   <p className="text-xs text-gray-500 mt-1">We are pleased to announce our latest citation metrics.</p>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default Home;
