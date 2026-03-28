import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

export const IssueContext = createContext();

export const useIssueContext = () => useContext(IssueContext);

const defaultIssues = [
  { id: 'ISS-1', title: 'Implement dark mode', status: 'done', assignee: 'JD', priority: 'medium', description: 'Add complete dark mode support.' },
  { id: 'ISS-2', title: 'Fix navigation bug', status: 'progress', assignee: 'AS', priority: 'high', description: 'Navigation fails on edge cases.' },
  { id: 'ISS-3', title: 'Update dependencies', status: 'todo', assignee: 'MK', priority: 'low', description: 'Update React to version 18.' },
  { id: 'ISS-4', title: 'Design system review', status: 'review', assignee: 'JD', priority: 'medium', description: 'Review new UI components.' },
  { id: 'ISS-5', title: 'Performance optimization', status: 'todo', assignee: 'AS', priority: 'high', description: 'Improve initial load time.' }
];

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('synctrack_issues');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultIssues;
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('synctrack_issues', JSON.stringify(issues));
  }, [issues]);

  const addIssue = useCallback((newIssue) => {
    setIssues(prev => [...prev, {
      id: `ISS-${Date.now().toString().slice(-4)}`,
      ...newIssue
    }]);
  }, []);

  const updateIssueStatus = useCallback((issueId, newStatus) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    ));
  }, []);

  const deleteIssue = useCallback((issueId) => {
    setIssues(prev => prev.filter(issue => issue.id !== issueId));
  }, []);

  return (
    <IssueContext.Provider value={{ issues, loading, error: null, addIssue, updateIssueStatus, deleteIssue }}>
      {children}
    </IssueContext.Provider>
  );
};
