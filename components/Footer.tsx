import React from 'react';
import { JOURNAL_ACRONYM } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-polyBlue text-gray-300 py-10 border-t-4 border-polyGold">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-white text-lg font-serif font-bold mb-4">About {JOURNAL_ACRONYM}</h3>
          <p className="text-sm leading-relaxed mb-4">
            The {JOURNAL_ACRONYM} is a peer-reviewed, open-access journal dedicated to promoting scholarly excellence in science, technology, and management.
          </p>
          <div className="flex space-x-4">
            {/* Social Icons Placeholders */}
            <span className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-polyGold hover:text-polyBlue transition">X</span>
            <span className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-polyGold hover:text-polyBlue transition">in</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-serif font-bold mb-4">Information For</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-polyGold transition-colors">Authors</a></li>
            <li><a href="#" className="hover:text-polyGold transition-colors">Reviewers</a></li>
            <li><a href="#" className="hover:text-polyGold transition-colors">Librarians</a></li>
            <li><a href="#" className="hover:text-polyGold transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-lg font-serif font-bold mb-4">Contact Office</h3>
          <address className="not-italic text-sm space-y-2">
            <p>Editorial Office, {JOURNAL_ACRONYM}</p>
            <p>Delta State Polytechnic</p>
            <p>PMB 1030</p>
            <p>Ogwashi-Uku, Delta State, Nigeria</p>
            <p className="mt-2">Email: <a href="mailto:editor@dspgjournal.edu.ng" className="text-polyGold">editor@dspgjournal.edu.ng</a></p>
          </address>
          <div className="mt-4 text-xs text-gray-400">
             ISSN: 1234-5678 (Online)
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-blue-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Delta State Polytechnic, Ogwashi-Uku. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;