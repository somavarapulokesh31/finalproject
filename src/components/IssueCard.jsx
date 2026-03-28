import React from 'react';
import { Calendar, User, Clock, AlertCircle } from 'lucide-react';

export default function IssueCard({ issue, onDragStart }) {
  const priorityColor = {
    low: '#3b82f6',
    medium: '#f59e0b',
    high: '#ef4444'
  }[issue.priority] || '#3b82f6';
  
  return (
    <div 
      className="issue-card" 
      draggable
      onDragStart={(e) => onDragStart(e, issue.id)}
      style={{ '--border-color': priorityColor }}
    >
      <div 
        className="issue-tag"
        style={{ color: priorityColor, backgroundColor: `${priorityColor}20` }}
      >
        {issue.priority.toUpperCase()}
      </div>
      
      <h3 className="issue-title">{issue.title}</h3>
      
      <div className="issue-meta">
        <span className="issue-id">{issue.id}</span>
        <div className="issue-assignee">
          {issue.assignee || 'UN'}
        </div>
      </div>
    </div>
  );
}
