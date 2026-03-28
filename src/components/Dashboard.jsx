import React, { useState, useMemo } from 'react';
import { useIssueContext } from '../contexts/IssueContext';
import BoardView from './BoardView';
import CreateIssueModal from './CreateIssueModal';
import { Plus, Search, Filter } from 'lucide-react';

export default function Dashboard() {
  const { issues, loading, error, addIssue, updateIssueStatus } = useIssueContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const matchSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || issue.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPriority = filterPriority === 'all' || issue.priority === filterPriority;
      return matchSearch && matchPriority;
    });
  }, [issues, searchTerm, filterPriority]);

  return (
    <>
      <div className="header">
        <h1 className="header-title">Issue Dashboard</h1>
        <div className="header-actions">
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
             <Search size={18} style={{ position: 'absolute', left: '10px', color: 'var(--text-muted)' }} />
             <input 
               type="text" 
               className="form-input" 
               placeholder="Search issues..." 
               style={{ paddingLeft: '36px', height: '40px', width: '250px' }}
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
             />
          </div>
          <select 
            className="btn btn-secondary" 
            style={{ width: 'auto', padding: '10px 16px', appearance: 'none' }}
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Create Issue
          </button>
        </div>
      </div>
      
      <div className="dashboard-area">
        {loading ? (
          <div className="loader-container animate-fade-in">
            <div className="spinner"></div>
            <p>Loading your issues...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <p className="text-danger">{error}</p>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="empty-state animate-fade-in">
            <Search size={48} />
            <h3>No issues found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <BoardView issues={filteredIssues} onStatusChange={updateIssueStatus} />
        )}
      </div>
      
      <CreateIssueModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={(data) => addIssue(data)} 
      />
    </>
  );
}
