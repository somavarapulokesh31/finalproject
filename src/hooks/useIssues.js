import { useState, useEffect, useCallback, useMemo } from 'react';

const mockIssues = [
  { id: 'ISS-1', title: 'Implement dark mode', status: 'done', assignee: 'JD', priority: 'medium', description: 'Add complete dark mode support.' },
  { id: 'ISS-2', title: 'Fix navigation bug', status: 'progress', assignee: 'AS', priority: 'high', description: 'Navigation fails on edge cases.' },
  { id: 'ISS-3', title: 'Update dependencies', status: 'todo', assignee: 'MK', priority: 'low', description: 'Update React to version 18.' },
  { id: 'ISS-4', title: 'Design system review', status: 'review', assignee: 'JD', priority: 'medium', description: 'Review new UI components.' },
  { id: 'ISS-5', title: 'Performance optimization', status: 'todo', assignee: 'AS', priority: 'high', description: 'Improve initial load time.' }
];

export function useIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchIssues = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulating async delay
        setIssues(mockIssues);
      } catch (err) {
        setError('Failed to fetch issues');
      } finally {
        setLoading(false);
      }
    };
    
    fetchIssues();
  }, []);

  const addIssue = useCallback(async (newIssue) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIssues(prev => [...prev, {
      id: `ISS-${prev.length + 1}`,
      ...newIssue
    }]);
    setLoading(false);
  }, []);

  const updateIssueStatus = useCallback(async (issueId, newStatus) => {
    // Optimistic update
    setIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    ));
    
    // Simulate real API update
    await new Promise(resolve => setTimeout(resolve, 300));
  }, []);

  const deleteIssue = useCallback(async (issueId) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIssues(prev => prev.filter(issue => issue.id !== issueId));
    setLoading(false);
  }, []);

  return {
    issues,
    loading,
    error,
    addIssue,
    updateIssueStatus,
    deleteIssue
  };
}
