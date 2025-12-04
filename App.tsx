
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Article from './pages/Article';
import Archives from './pages/Archives';
import Submission from './pages/Submission';
import PlagiarismChecker from './pages/PlagiarismChecker';
import EditorialBoard from './pages/EditorialBoard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { JournalProvider } from './context/JournalContext';
import { AuthProvider } from './context/AuthContext';
import { JOURNAL_NAME, JOURNAL_ACRONYM } from './constants';

const About = () => (
  <div className="container mx-auto px-4 py-12 text-center">
    <h1 className="text-3xl font-serif font-bold text-polyBlue mb-4">About {JOURNAL_ACRONYM}</h1>
    <p className="max-w-2xl mx-auto text-gray-700">
      The {JOURNAL_NAME} is committed to publishing high-quality, peer-reviewed research. 
      Our scope covers Engineering, Applied Sciences, Business Management, and Humanities. We aim to solve local challenges through global standards of research.
    </p>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <JournalProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/article/:id" element={<Article />} />
                <Route path="/archives" element={<Archives />} />
                <Route path="/submit" element={<Submission />} />
                <Route path="/check" element={<PlagiarismChecker />} />
                <Route path="/editorial-board" element={<EditorialBoard />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </JournalProvider>
    </AuthProvider>
  );
};

export default App;
