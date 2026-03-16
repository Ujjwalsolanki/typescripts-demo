import React from 'react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header = ({ searchTerm, setSearchTerm, isDarkMode, toggleTheme }: HeaderProps) => {
  return (
    <header style={{
      ...headerStyle, 
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', 
      borderBottom: `1px solid ${isDarkMode ? '#333' : '#eee'}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px' }}>
        <span style={{ fontSize: '24px' }}>🛡️</span>
        <h1 style={{ 
          margin: 0, 
          fontSize: '20px', 
          color: isDarkMode ? '#fff' : '#1a1a1a', 
          fontWeight: '800' 
        }}>
          GLOBAL <span style={{ color: '#007bff' }}>INTEL</span>
        </h1>
      </div>

      <div style={{
        ...searchContainerStyle, 
        backgroundColor: isDarkMode ? '#2d2d2d' : '#f5f5f5', 
        border: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}`
      }}>
        <span style={{ marginRight: '10px' }}>🔍</span>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{...searchInputStyle, color: isDarkMode ? '#fff' : '#000'}}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', minWidth: '220px', justifyContent: 'flex-end' }}>
        <div onClick={toggleTheme} style={toggleContainer}>
          <div style={{
            ...toggleCircle, 
            transform: isDarkMode ? 'translateX(18px)' : 'translateX(0)', 
            backgroundColor: isDarkMode ? '#007bff' : '#ccc'
          }} />
        </div>
        <div style={badgeStyle}>AI Engine Active</div>
        <div style={avatarStyle}>U</div>
      </div>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  height: '60px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 30px',
  transition: '0.3s'
};

const searchContainerStyle: React.CSSProperties = {
  padding: '6px 15px',
  borderRadius: '20px',
  width: '35%',
  display: 'flex',
  alignItems: 'center'
};

const searchInputStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  outline: 'none',
  width: '100%',
  fontSize: '14px'
};

const toggleContainer: React.CSSProperties = {
  width: '38px',
  height: '20px',
  borderRadius: '20px',
  backgroundColor: '#444',
  padding: '2px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
};

const toggleCircle: React.CSSProperties = {
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  transition: '0.3s'
};

const badgeStyle = { fontSize: '11px', color: '#007bff', fontWeight: 'bold' as const };
const avatarStyle = { width: '32px', height: '32px', backgroundColor: '#007bff', borderRadius: '50%', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' };