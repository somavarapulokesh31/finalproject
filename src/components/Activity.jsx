import React from 'react';
import { Activity as ActivityIcon, CheckCircle, PlusCircle, Edit, MessageSquare } from 'lucide-react';

const mockActivity = [
  { id: 1, user: 'JD', action: 'completed', target: 'ticket ISS-1', time: '10 minutes ago', icon: <CheckCircle size={18} color="var(--status-done)" /> },
  { id: 2, user: 'AS', action: 'moved', target: 'ISS-2 to In Progress', time: '1 hour ago', icon: <Edit size={18} color="var(--status-progress)" /> },
  { id: 3, user: 'MK', action: 'commented on', target: 'ISS-3', time: '2 hours ago', icon: <MessageSquare size={18} color="var(--status-review)" /> },
  { id: 4, user: 'JD', action: 'created', target: 'new ticket ISS-4', time: 'Yesterday', icon: <PlusCircle size={18} color="var(--primary)" /> },
  { id: 5, user: 'System', action: 'ran automation on', target: 'stale tickets', time: '2 days ago', icon: <ActivityIcon size={18} color="var(--text-muted)" /> },
];

export default function Activity() {
  return (
    <div className="main-content">
      <div className="header">
        <h1 className="header-title">Activity Timeline</h1>
      </div>
      
      <div className="dashboard-area animate-fade-in" style={{ padding: '32px' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--panel-bg)', padding: '24px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            <h2 style={{ marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>Recent Events</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               {mockActivity.map(event => (
                 <div key={event.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '50%', 
                      background: 'rgba(255,255,255,0.05)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                       {event.icon}
                    </div>
                    <div>
                       <p style={{ margin: 0, fontSize: '1.05rem' }}>
                          <strong style={{ color: 'var(--text-main)' }}>{event.user}</strong>{' '}
                          <span style={{ color: 'var(--text-muted)' }}>{event.action}</span>{' '}
                          <strong style={{ color: 'var(--text-main)' }}>{event.target}</strong>
                       </p>
                       <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{event.time}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
