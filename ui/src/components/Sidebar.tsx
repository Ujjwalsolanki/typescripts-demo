import type { ViewState } from '../types/country';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isDarkMode: boolean; // Add this
}

export const Sidebar = ({ currentView, setView, isDarkMode }: SidebarProps) => {
  const menuItems: { id: ViewState; label: string }[] = [
    { id: 'all', label: '🌍 All Countries' },
    { id: 'favorites', label: '⭐ Favorites' },
    { id: 'ai-insights', label: '🤖 AI Analysis' }
  ];

  const sidebarBg = isDarkMode ? '#1a1a1a' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#333333';
  const hoverBg = isDarkMode ? '#333333' : '#f0f0f0';

  return (
    <aside style={{ 
      width: '240px', 
      backgroundColor: sidebarBg, 
      borderRight: `1px solid ${isDarkMode ? '#333' : '#eee'}`, 
      padding: '20px',
      transition: '0.3s'
    }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {menuItems.map((item) => (
          <li 
            key={item.id}
            onClick={() => setView(item.id)}
            style={{ 
              padding: '10px 15px', 
              cursor: 'pointer',
              color: textColor,
              backgroundColor: currentView === item.id ? (isDarkMode ? '#007bff' : '#e7f3ff') : 'transparent',
              borderRadius: '6px',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: currentView === item.id ? '600' : '400',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              if (currentView !== item.id) e.currentTarget.style.backgroundColor = hoverBg;
            }}
            onMouseLeave={(e) => {
              if (currentView !== item.id) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};