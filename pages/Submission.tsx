
import React, { useState } from 'react';
import { useJournal } from '../context/JournalContext';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';
import { JOURNAL_ACRONYM } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Check, ChevronRight, FileText, Upload, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, title: 'Author Info', icon: User },
  { id: 2, title: 'Manuscript Details', icon: FileText },
  { id: 3, title: 'Upload Files', icon: Upload },
  { id: 4, title: 'Review', icon: Check }
];

const Submission: React.FC = () => {
  const navigate = useNavigate();
  const { addSubmission } = useJournal();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    authorName: user?.name || '',
    email: user?.email || '',
    institution: user?.institution || '',
    file: null as File | null
  });

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubmission({
      id: `sub-${Date.now()}`,
      title: formData.title,
      abstract: formData.abstract,
      authorName: formData.authorName,
      authorId: user?.id || 'guest',
      email: formData.email,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      keywords: formData.keywords.split(',').map(k => k.trim()),
      fileUrl: '#'
    });
    // Redirect to dashboard instead of home
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO title="New Submission" description={`Submit your research to ${JOURNAL_ACRONYM}`} />
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
           <h1 className="text-3xl font-serif font-bold text-polyBlue">Submit Manuscript</h1>
           <p className="text-gray-500">Follow the steps below to submit your research for review.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-10 relative px-4 md:px-12">
           <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
           <div className="absolute top-1/2 left-0 h-1 bg-polyBlue -z-10 transform -translate-y-1/2 transition-all duration-500" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
           
           {steps.map((step) => {
             const Icon = step.icon;
             const active = step.id <= currentStep;
             return (
               <div key={step.id} className="flex flex-col items-center bg-gray-50 px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${active ? 'bg-polyBlue border-polyBlue text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                     <Icon size={18} />
                  </div>
                  <span className={`text-xs font-bold mt-2 ${active ? 'text-polyBlue' : 'text-gray-400'}`}>{step.title}</span>
               </div>
             )
           })}
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
           <form onSubmit={handleSubmit}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* STEP 1: AUTHOR INFO */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                     <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Corresponding Author</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                           <input 
                             type="text" 
                             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-polyBlue outline-none transition"
                             value={formData.authorName}
                             onChange={e => setFormData({...formData, authorName: e.target.value})}
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                           <input 
                             type="email" 
                             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-polyBlue outline-none transition"
                             value={formData.email}
                             onChange={e => setFormData({...formData, email: e.target.value})}
                           />
                        </div>
                        <div className="md:col-span-2">
                           <label className="block text-sm font-bold text-gray-700 mb-2">Institution / Affiliation</label>
                           <input 
                             type="text" 
                             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-polyBlue outline-none transition"
                             value={formData.institution}
                             onChange={e => setFormData({...formData, institution: e.target.value})}
                           />
                        </div>
                     </div>
                  </div>
                )}

                {/* STEP 2: DETAILS */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                     <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Manuscript Metadata</h2>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Article Title</label>
                        <input 
                          type="text" 
                          placeholder="Enter a descriptive title"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-polyBlue outline-none transition"
                          value={formData.title}
                          onChange={e => setFormData({...formData, title: e.target.value})}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Abstract (Max 300 words)</label>
                        <textarea 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-polyBlue outline-none transition h-40 resize-none"
                          value={formData.abstract}
                          onChange={e => setFormData({...formData, abstract: e.target.value})}
                        ></textarea>
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Keywords (Comma separated)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. AI, Education, Nigeria"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-polyBlue outline-none transition"
                          value={formData.keywords}
                          onChange={e => setFormData({...formData, keywords: e.target.value})}
                        />
                     </div>
                  </div>
                )}

                {/* STEP 3: UPLOAD */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                     <h2 className="text-xl font-bold text-gray-800 border-b pb-2">File Upload</h2>
                     
                     <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer group text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                           <Upload className="text-polyBlue" size={32} />
                        </div>
                        <p className="font-bold text-gray-700">Drag & Drop manuscript here</p>
                        <p className="text-sm text-gray-500 mb-4">or click to browse (.pdf, .docx)</p>
                        <input type="file" className="hidden" />
                        <button type="button" className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-bold text-gray-700">Browse Files</button>
                     </div>

                     <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-3">
                        <AlertCircle className="text-yellow-600 shrink-0" />
                        <div className="text-sm text-yellow-800">
                           <p className="font-bold">Anonymity Check</p>
                           <p>Please ensure you have removed all author names and affiliations from the manuscript file to facilitate double-blind review.</p>
                        </div>
                     </div>
                  </div>
                )}

                {/* STEP 4: REVIEW */}
                {currentStep === 4 && (
                   <div className="space-y-6 text-center">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                         <Check size={40} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Ready to Submit?</h2>
                      <p className="text-gray-600 max-w-lg mx-auto">
                         Please review your details. By clicking submit, you confirm that this work is original and not under consideration elsewhere.
                      </p>
                      
                      <div className="bg-gray-50 p-6 rounded-xl text-left max-w-lg mx-auto border border-gray-200">
                         <div className="mb-2"><span className="font-bold text-gray-700">Title:</span> {formData.title}</div>
                         <div className="mb-2"><span className="font-bold text-gray-700">Author:</span> {formData.authorName}</div>
                         <div className="truncate"><span className="font-bold text-gray-700">Abstract:</span> {formData.abstract.substring(0, 50)}...</div>
                      </div>
                   </div>
                )}
              </motion.div>

              {/* Navigation Buttons */}
              <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
                 {currentStep > 1 ? (
                    <button type="button" onClick={handlePrev} className="px-6 py-2 rounded-lg border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 transition">
                       Back
                    </button>
                 ) : <div></div>}

                 {currentStep < 4 ? (
                    <button type="button" onClick={handleNext} className="bg-polyBlue text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 transition flex items-center gap-2">
                       Next Step <ChevronRight size={18} />
                    </button>
                 ) : (
                    <button type="submit" className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                       Submit Manuscript
                    </button>
                 )}
              </div>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Submission;
