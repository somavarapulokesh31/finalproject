import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function CreateIssueModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'low',
    status: 'todo',
    assignee: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      setFormData({ title: '', description: '', priority: 'low', status: 'todo', assignee: '' });
      onClose();
    }
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content glass-panel animate-slide-in">
        <div className="modal-header">
          <h2 className="modal-title">Create New Issue</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Issue Title</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="E.g., Fix login page bug"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              autoFocus
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="form-textarea" 
              placeholder="Detailed description of the issue..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select 
              className="form-select"
              value={formData.priority}
              onChange={e => setFormData({...formData, priority: e.target.value})}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Assignee Initials</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="E.g., JD"
              maxLength={2}
              value={formData.assignee}
              onChange={e => setFormData({...formData, assignee: e.target.value.toUpperCase()})}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Issue</button>
          </div>
        </form>
      </div>
    </div>
  );
}
