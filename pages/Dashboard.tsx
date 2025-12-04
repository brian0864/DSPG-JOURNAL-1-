
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useJournal } from '../context/JournalContext';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { UserRole } from '../types';
import { FileText, Clock, CheckCircle, XCircle, Plus, Search, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { submissions, articles } = useJournal();
  const navigate = useNavigate();

  if (!user) return <div className="p-8 text-center">Please log in to view dashboard.</div>;

  const mySubmissions = submissions.filter(s => s.authorId === user.id || s.email === user.email);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'accepted': return <Badge variant="success">Accepted</Badge>;
      case 'rejected': return <Badge variant="error">Rejected</Badge>;
      case 'submitted': return <Badge variant="default">Submitted</Badge>;
      case 'under_review': return <Badge variant="warning">Under Review</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-serif font-bold text-polyBlue">
             {user.role === UserRole.EDITOR ? 'Editorial Dashboard' : 'Author Workspace'}
           </h1>
           <p className="text-gray-500 mt-1">Welcome back, {user.name}</p>
        </div>
        {user.role === UserRole.AUTHOR && (
          <button 
            onClick={() => navigate('/submit')}
            className="bg-polyGold text-polyBlue font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-400 flex items-center gap-2 transition-transform hover:-translate-y-0.5"
          >
            <Plus size={18} /> New Submission
          </button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         <Card className="border-l-4 border-l-blue-500">
            <CardContent className="flex items-center justify-between p-6">
               <div>
                 <p className="text-sm text-gray-500 uppercase font-bold">Active Papers</p>
                 <p className="text-2xl font-bold text-gray-800">{user.role === UserRole.EDITOR ? submissions.length : mySubmissions.length}</p>
               </div>
               <FileText className="text-blue-200" size={32} />
            </CardContent>
         </Card>
         <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="flex items-center justify-between p-6">
               <div>
                 <p className="text-sm text-gray-500 uppercase font-bold">Under Review</p>
                 <p className="text-2xl font-bold text-gray-800">
                   {user.role === UserRole.EDITOR 
                     ? submissions.filter(s => s.status === 'under_review').length 
                     : mySubmissions.filter(s => s.status === 'under_review').length}
                 </p>
               </div>
               <Clock className="text-yellow-200" size={32} />
            </CardContent>
         </Card>
         <Card className="border-l-4 border-l-green-500">
            <CardContent className="flex items-center justify-between p-6">
               <div>
                 <p className="text-sm text-gray-500 uppercase font-bold">Published</p>
                 <p className="text-2xl font-bold text-gray-800">
                   {user.role === UserRole.EDITOR ? articles.length : articles.filter(a => a.authors.includes(user.name)).length}
                 </p>
               </div>
               <CheckCircle className="text-green-200" size={32} />
            </CardContent>
         </Card>
         {user.role === UserRole.EDITOR && (
           <Card className="border-l-4 border-l-purple-500">
              <CardContent className="flex items-center justify-between p-6">
                 <div>
                   <p className="text-sm text-gray-500 uppercase font-bold">Avg Review Time</p>
                   <p className="text-2xl font-bold text-gray-800">14 Days</p>
                 </div>
                 <BarChart className="text-purple-200" size={32} />
              </CardContent>
           </Card>
         )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Manuscripts List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {user.role === UserRole.EDITOR ? 'All Incoming Manuscripts' : 'My Manuscripts'}
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <input type="text" placeholder="Search..." className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-polyBlue outline-none" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Title / ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(user.role === UserRole.EDITOR ? submissions : mySubmissions).map((sub) => (
                    <tr key={sub.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 line-clamp-1">{sub.title}</div>
                        <div className="text-xs text-gray-500">ID: {sub.id}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(sub.status)}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-polyBlue hover:text-polyGold text-sm font-semibold">View</button>
                      </td>
                    </tr>
                  ))}
                  {(user.role === UserRole.EDITOR ? submissions : mySubmissions).length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500 italic">No submissions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {user.role === UserRole.EDITOR ? (
            <Card>
              <CardHeader><h3 className="font-bold">Pending Actions</h3></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                   <Clock className="text-red-500 mt-1" size={16} />
                   <div>
                     <p className="text-sm font-bold text-red-700">Overdue Reviews</p>
                     <p className="text-xs text-red-600">3 manuscripts have overdue reviews.</p>
                   </div>
                </div>
                <button className="w-full border border-gray-300 py-2 rounded text-sm hover:bg-gray-50">View All Tasks</button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader><h3 className="font-bold">Submission Guide</h3></CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm space-y-3 text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Ensure double-blind format</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Use APA 7th Edition</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Run Plagiarism Check</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
