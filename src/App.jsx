import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MyIssues from './components/MyIssues';
import Activity from './components/Activity';
import Settings from './components/Settings';
import { IssueProvider } from './contexts/IssueContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <IssueProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="my-issues" element={<MyIssues />} />
            <Route path="activity" element={<Activity />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </IssueProvider>
    </ThemeProvider>
  );
}

export default App;
