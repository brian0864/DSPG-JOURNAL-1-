
import React from 'react';
import SEO from '../components/SEO';
import { EDITORIAL_BOARD, JOURNAL_ACRONYM } from '../constants';

const EditorialBoard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <SEO title="Editorial Board" description={`Meet the distinguished editorial board members of ${JOURNAL_ACRONYM}.`} />
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-polyBlue mb-4">Editorial Board</h1>
        <div className="w-24 h-1 bg-polyGold mx-auto rounded"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Our team of distinguished academics and industry experts ensures the highest standards of peer review and publication ethics.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Editor in Chief Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200 pb-2 mb-6">Editor-in-Chief</h2>
          {EDITORIAL_BOARD.filter(m => m.role === "Editor-in-Chief").map(member => (
            <div key={member.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-polyGold flex flex-col md:flex-row items-center md:items-start gap-6">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-100 bg-gray-50"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-polyBlue">{member.name}</h3>
                <p className="text-polyGold font-medium mb-2">{member.affiliation}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Prof. Achu brings over 25 years of academic leadership in engineering and polytechnic administration. 
                  He is dedicated to fostering research that solves indigenous challenges.
                </p>
                <button className="mt-4 text-xs font-semibold text-polyBlue border border-polyBlue px-3 py-1 rounded hover:bg-polyBlue hover:text-white transition">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Board Members Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200 pb-2 mb-6">Editorial Board Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDITORIAL_BOARD.filter(m => m.role !== "Editor-in-Chief").map(member => (
              <div key={member.id} className="bg-white p-5 rounded border border-gray-200 hover:shadow-lg transition-shadow flex items-start gap-4">
                 {member.image ? (
                   <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full bg-gray-50" />
                 ) : (
                   <div className="w-16 h-16 rounded-full bg-polyBlue text-white flex items-center justify-center font-bold text-xl">
                      {member.name.charAt(0)}
                   </div>
                 )}
                 <div>
                   <h4 className="font-bold text-gray-800 text-lg">{member.name}</h4>
                   <p className="text-xs text-polyGold uppercase font-bold tracking-wide mb-1">{member.role}</p>
                   <p className="text-sm text-gray-600">{member.affiliation}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-blue-50 p-8 rounded-lg text-center">
           <h3 className="font-bold text-polyBlue text-lg mb-2">Join Our Reviewer Panel</h3>
           <p className="text-sm text-gray-700 mb-6">We are always looking for qualified experts to join our peer review process.</p>
           <a href="mailto:editor@dspgjournal.edu.ng" className="bg-polyBlue text-white px-6 py-3 rounded hover:bg-blue-800 transition shadow">Apply as Reviewer</a>
        </div>
      </div>
    </div>
  );
};

export default EditorialBoard;
