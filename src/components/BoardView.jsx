import React, { useMemo } from 'react';
import IssueCard from './IssueCard';
import { Circle, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const COLUMNS = [
  { id: 'todo', title: 'To Do', icon: <Circle size={16} />, className: 'status-todo' },
  { id: 'progress', title: 'In Progress', icon: <Clock size={16} />, className: 'status-progress' },
  { id: 'review', title: 'In Review', icon: <AlertCircle size={16} />, className: 'status-review' },
  { id: 'done', title: 'Done', icon: <CheckCircle size={16} />, className: 'status-done' }
];

export default function BoardView({ issues, onStatusChange }) {
  const issuesByStatus = useMemo(() => {
    const grouped = { todo: [], progress: [], review: [], done: [] };
    issues.forEach(issue => {
      if (grouped[issue.status]) {
        grouped[issue.status].push(issue);
      }
    });
    return grouped;
  }, [issues]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('issueId', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('issueId');
    const issue = issues.find(i => i.id === id);
    if (issue && issue.status !== status) {
      onStatusChange(id, status);
    }
  };

  return (
    <div className="board-container">
      {COLUMNS.map(column => (
        <div 
          key={column.id} className="board-column"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="board-column-header">
            <div className="column-title">
               <span className={`status-badge ${column.className}`}>{column.icon} {column.title}</span>
            </div>
            <span className="issue-count">{issuesByStatus[column.id].length}</span>
          </div>
          
          <div className="issue-list">
            {issuesByStatus[column.id].map(issue => (
              <IssueCard 
                key={issue.id} 
                issue={issue} 
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
