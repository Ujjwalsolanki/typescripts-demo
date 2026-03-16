import { useState, useEffect, useMemo } from 'react';
import type { Country, ViewState } from './types/country';
import { Sidebar } from './components/Sidebar';
import { DetailModal } from './components/DetailModal';
import { Header } from './components/Header';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [view, setView] = useState<ViewState>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags')
      .then(res => res.json())
      .then((data: Country[]) => {
        setCountries(data.slice(0, 50));
        setLoading(false);
      });
  }, []);

  const theme = {
    bg: isDarkMode ? '#0f0f0f' : '#f4f7f6',
    card: isDarkMode ? '#1a1a1a' : '#ffffff',
    text: isDarkMode ? '#efefef' : '#111111',
    border: isDarkMode ? '#2d2d2d' : '#e0e0e0',
    subtext: isDarkMode ? '#888888' : '#666666',
    headerBg: isDarkMode ? '#222222' : '#fafafa'
  };

  // PIXEL PERFECT ALIGNMENT: Explicit widths for every column
  const columnWidths = {
    name: '35%',
    capital: '25%',
    currency: '20%',
    action: '20%'
  };

  const filteredCountries = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return countries.filter(c => 
      c.name.common.toLowerCase().includes(q) || 
      (c.capital?.[0] || '').toLowerCase().includes(q)
    );
  }, [countries, searchTerm]);

  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw',
      backgroundColor: theme.bg, color: theme.text, transition: '0.3s'
    }}>
      <Header 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
        isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar currentView={view} setView={setView} isDarkMode={isDarkMode} />
        
        <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>{view.toUpperCase()} RECORDS</h2>
            <span style={{ fontSize: '12px', color: theme.subtext }}>{filteredCountries.length} Results</span>
          </div>

          <div style={{ 
            backgroundColor: theme.card, borderRadius: '12px', border: `1px solid ${theme.border}`,
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', overflow: 'hidden'
          }}>
            {/* table-layout: fixed is what ensures the columns stay locked under the headers */}
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ backgroundColor: theme.headerBg, borderBottom: `2px solid ${theme.border}` }}>
                  <th style={{ ...thStyle, width: columnWidths.name }}>COUNTRY</th>
                  <th style={{ ...thStyle, width: columnWidths.capital }}>CAPITAL</th>
                  <th style={{ ...thStyle, width: columnWidths.currency }}>CURRENCY</th>
                  <th style={{ ...thStyle, width: columnWidths.action, textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredCountries.map(c => (
                  <tr key={c.name.common} style={{ borderBottom: `1px solid ${theme.border}` }}>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={c.flags.png} width="24" style={{ borderRadius: '3px' }} alt="" />
                        <span style={{ fontWeight: 700 }}>{c.name.common}</span>
                      </div>
                    </td>
                    <td style={{ ...tdStyle, color: theme.subtext }}>
                      {c.capital?.[0] || '—'}
                    </td>
                    <td style={tdStyle}>
                      <span style={pillStyle}>{Object.keys(c.currencies || {})[0] || 'N/A'}</span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                      <button onClick={() => setSelectedCountry(c)} style={actionBtn}>View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <DetailModal country={selectedCountry} onClose={() => setSelectedCountry(null)} isDarkMode={isDarkMode} />
    </div>
  );
}

// --- SHARED STYLES FOR ALIGNMENT ---

const thStyle: React.CSSProperties = { 
  padding: '16px 20px', 
  fontSize: '11px', 
  color: '#888', 
  fontWeight: 700,
  letterSpacing: '1px',
  textAlign: 'left' // Header must be left-aligned
};

const tdStyle: React.CSSProperties = { 
  padding: '14px 20px', // Matches the header padding exactly
  fontSize: '14px',
  textAlign: 'left', // Row must be left-aligned to match header
  verticalAlign: 'middle'
};

const pillStyle = { 
  backgroundColor: '#333', color: '#fff', padding: '3px 8px', 
  borderRadius: '5px', fontSize: '11px', fontWeight: 800 
};

const actionBtn = { 
  padding: '7px 16px', backgroundColor: '#007bff', color: '#fff', 
  border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 
};

export default App;