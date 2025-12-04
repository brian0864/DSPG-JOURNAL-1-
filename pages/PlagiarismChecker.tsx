
import React, { useState } from 'react';
import { checkPlagiarismWithGemini } from '../services/geminiService';
import { PlagiarismResult } from '../types';
import SEO from '../components/SEO';

const PlagiarismChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'results'>('input');

  const handleCheck = async () => {
    if (!text || text.length < 50) {
      alert("Please enter at least 50 characters for analysis.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await checkPlagiarismWithGemini(text);
      setResult(data);
      setActiveTab('results'); // Switch to results tab on success
    } catch (error) {
      alert("An error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
      <SEO 
        title="Plagiarism Checker" 
        description="Free AI-powered plagiarism and originality checker for academic manuscripts." 
      />

      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-polyBlue mb-3">
          Originality & Plagiarism Checker
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Powered by Gemini AI. Validate your manuscript for originality and AI-generated patterns before submission.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex-1 pb-4 text-sm md:text-base font-bold uppercase tracking-wide border-b-2 transition-colors focus:outline-none ${
            activeTab === 'input' 
              ? 'border-polyBlue text-polyBlue' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
          onClick={() => setActiveTab('input')}
        >
          1. Input Text
        </button>
        <button
          className={`flex-1 pb-4 text-sm md:text-base font-bold uppercase tracking-wide border-b-2 transition-colors focus:outline-none ${
            activeTab === 'results' 
              ? 'border-polyBlue text-polyBlue' 
              : 'border-transparent text-gray-300'
          } ${!result ? 'cursor-not-allowed opacity-50' : 'hover:text-gray-600'}`}
          onClick={() => result && setActiveTab('results')}
          disabled={!result}
        >
          2. Analysis Results
        </button>
      </div>

      {/* INPUT TAB */}
      {activeTab === 'input' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {/* Main Input Area */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gray-50 border-b px-4 py-3 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Paste Text</span>
              <span className="text-xs text-gray-500">Max 15k chars</span>
            </div>
            <div className="p-4 md:p-6">
              <textarea
                className="w-full h-48 md:h-80 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-polyBlue focus:border-transparent transition-all font-mono text-sm resize-y"
                placeholder="Paste your abstract or article content here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-label="Text to check for plagiarism"
              ></textarea>
              
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xs text-gray-500 order-2 sm:order-1">
                  <span className="font-bold">Note:</span> Does not store your data. Local analysis only.
                </div>
                <button
                  onClick={handleCheck}
                  disabled={loading || text.length < 50}
                  className={`w-full sm:w-auto order-1 sm:order-2 px-8 py-3 rounded font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-polyBlue hover:bg-blue-800'}`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Analyzing...
                    </span>
                  ) : 'Check Originality'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
               <h3 className="font-bold text-polyBlue mb-2">Upload Document</h3>
               <p className="text-xs text-gray-600 mb-4">Support for .doc, .docx, .pdf (Simulated)</p>
               <label className="flex flex-col items-center px-4 py-8 bg-white text-blue rounded-lg shadow-sm border border-blue-200 cursor-pointer hover:bg-blue-50 transition active:bg-blue-100">
                  <svg className="w-8 h-8 text-polyBlue mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" /></svg>
                  <span className="text-xs font-semibold text-gray-600">Click to Select File</span>
                  <input type='file' className="hidden" disabled />
               </label>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
               <h4 className="font-bold text-sm mb-2 text-gray-800">How it works</h4>
               <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside">
                  <li>Paste text or upload document.</li>
                  <li>AI analyzes for synthetic patterns & duplicates.</li>
                  <li>Get instant feedback and score.</li>
               </ul>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS TAB */}
      {activeTab === 'results' && result && (
        <div className="bg-white rounded-lg shadow-xl border-t-8 border-polyGold overflow-hidden animate-fade-in w-full">
          <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-4">
               <h2 className="text-xl md:text-2xl font-bold text-gray-800">Analysis Report</h2>
               <button 
                  onClick={() => {
                     setResult(null);
                     setActiveTab('input');
                     setText('');
                  }}
                  className="text-sm text-polyBlue hover:text-red-600 font-semibold underline mt-2 md:mt-0"
               >
                  Start New Check
               </button>
            </div>
            
            {/* Score Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
               <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Originality Score</div>
                  <div className={`mt-2 font-bold flex justify-center items-baseline ${result.score > 80 ? 'text-green-600' : result.score > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    <span className="text-5xl">{result.score}</span>
                    <span className="text-lg text-gray-400 ml-1">/100</span>
                  </div>
               </div>
               <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Similarity Index</div>
                  <div className="mt-2 font-bold flex justify-center items-baseline text-gray-800">
                    <span className="text-5xl">{result.similarityPercentage}</span>
                    <span className="text-lg text-gray-400 ml-1">%</span>
                  </div>
               </div>
               <div className="text-center p-4 bg-gray-50 rounded-lg flex flex-col justify-center border border-gray-100">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Outcome</div>
                  <div className="mt-2 font-bold text-lg">
                    {result.score > 80 ? <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full">Passed</span> : <span className="text-red-600 bg-red-100 px-3 py-1 rounded-full">Review Needed</span>}
                  </div>
               </div>
            </div>

            {/* Analysis Text */}
            <div className="mb-8">
               <h3 className="font-bold text-lg text-polyBlue mb-2 border-l-4 border-polyBlue pl-3">Detailed AI Analysis</h3>
               <div className="bg-blue-50 p-5 rounded text-gray-800 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                 {result.analysis}
               </div>
            </div>

            {/* Flagged Sections */}
            {result.flaggedSections && result.flaggedSections.length > 0 ? (
              <div>
                <h3 className="font-bold text-lg text-red-700 mb-4 border-l-4 border-red-500 pl-3">Flagged Sections</h3>
                <div className="space-y-4">
                  {result.flaggedSections.map((section, idx) => (
                    <div key={idx} className="border border-red-200 rounded-lg p-4 bg-red-50 break-words">
                       <div className="flex items-start">
                          <span className="bg-red-200 text-red-800 text-xs font-bold px-2 py-0.5 rounded mr-2 mt-1 shrink-0">#{idx + 1}</span>
                          <div>
                            <p className="text-gray-800 italic mb-2 text-sm">"{section.text}"</p>
                            <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Issue: {section.reason}</p>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
               <div className="bg-green-50 p-4 rounded border border-green-200 text-center">
                  <p className="text-green-800 font-medium">No specific sections were flagged as suspicious.</p>
               </div>
            )}

            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-center gap-4">
               <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition" onClick={() => window.print()}>
                 Download PDF Report
               </button>
               <button className="border border-polyBlue text-polyBlue px-6 py-2 rounded hover:bg-blue-50 transition" onClick={() => setActiveTab('input')}>
                 Back to Input
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;
