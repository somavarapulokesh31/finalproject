import React, { useState } from 'react';
import { Save, Bell, Shield, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="main-content">
      <div className="header">
        <h1 className="header-title">Settings</h1>
      </div>
      
      <div className="dashboard-area animate-fade-in" style={{ padding: '32px' }}>
        <form onSubmit={handleSave} style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
               <Palette size={20} color="var(--primary)" /> Appearance
            </h2>
            <div className="form-group">
                <label className="form-label">Theme</label>
                <select 
                  className="form-select" 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="system">System Default</option>
                  <option value="dark">Dark Mode (Vibrant)</option>
                  <option value="midnight">Midnight OLED</option>
                </select>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
               <Bell size={20} color="var(--status-progress)" /> Notifications
            </h2>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input type="checkbox" id="emailNotifs" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                <label htmlFor="emailNotifs" style={{ color: 'var(--text-main)', cursor: 'pointer' }}>Email me when tickets are updated</label>
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
                <input type="checkbox" id="prioNotifs" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                <label htmlFor="prioNotifs" style={{ color: 'var(--text-main)', cursor: 'pointer' }}>Alert me strictly for High Priority tickets</label>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
               <Shield size={20} color="var(--status-done)" /> Security Workspace
            </h2>
            <div className="form-group">
                <label className="form-label">Change Workspace Display Name</label>
                <input type="text" className="form-input" defaultValue="SyncTrack Main Workspace" />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', alignItems: 'center' }}>
             {saved && <span style={{ color: 'var(--status-done)' }} className="animate-slide-in">Preferences saved successfully!</span>}
             <button type="submit" className="btn btn-primary"><Save size={18} /> Save Settings</button>
          </div>

        </form>
      </div>
    </div>
  );
}
