import React, { useMemo } from 'react';
import { useIssueContext } from '../contexts/IssueContext';
import { Calendar, User, Search } from 'lucide-react';

export default function MyIssues() {
  const { issues, loading, error, updateIssueStatus } = useIssueContext();
  
  // Simulated logged-in user's initials
  const currentUser = 'JD';

  const myIssues = useMemo(() => {
    return issues.filter(issue => issue.assignee === currentUser);
  }, [issues, currentUser]);

  if (loading) return <div className="loader-container"><div className="spinner"></div><p>Loading your assigned tasks...</p></div>;
  if (error) return <div className="empty-state"><p className="text-danger">{error}</p></div>;

  return (
    <div className="main-content">
      <div className="header">
        <h1 className="header-title">My Issues</h1>
      </div>
      
      <div className="dashboard-area animate-fade-in" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2>Assigned to `{currentUser}` ({myIssues.length})</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="status-badge status-todo">To Do: {myIssues.filter(i => i.status === 'todo').length}</span>
            <span className="status-badge status-progress">In Progress: {myIssues.filter(i => i.status === 'progress').length}</span>
          </div>
        </div>

        {myIssues.length === 0 ? (
          <div className="empty-state">
             <Search size={48} />
             <h3>No issues assigned to you!</h3>
             <p>Check the main dashboard to pick up tasks.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             {myIssues.map(issue => (
               <div key={issue.id} className="issue-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div>
                    <div className="issue-tag" style={{ color: '#fff', background: 'rgba(255,255,255,0.1)' }}>{issue.id}</div>
                    <h3 style={{ fontSize: '1.1rem', margin: '4px 0 8px', color: 'var(--text-main)' }}>{issue.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{issue.description}</p>
                 </div>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                    <select 
                      className="form-select" 
                      value={issue.status} 
                      onChange={(e) => updateIssueStatus(issue.id, e.target.value)}
                      style={{ width: '150px' }}
                    >
                      <option value="todo">To Do</option>
                      <option value="progress">In Progress</option>
                      <option value="review">In Review</option>
                      <option value="done">Done</option>
                    </select>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Priority: <strong style={{color: 'var(--text-main)'}}>{issue.priority.toUpperCase()}</strong></span>
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
