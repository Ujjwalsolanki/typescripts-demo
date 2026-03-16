import type { Country } from '../types/country';

interface ModalProps {
  country: Country | null;
  onClose: () => void;
  isDarkMode: boolean; // Add this prop
}

export const DetailModal = ({ country, onClose, isDarkMode }: ModalProps) => {
  if (!country) return null;

  // Theme-based colors
  const bgColor = isDarkMode ? '#1e1e1e' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#1a1a1a';
  const subTextColor = isDarkMode ? '#aaaaaa' : '#666666';
  const borderColor = isDarkMode ? '#333333' : '#eeeeee';

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div 
        style={{...modalContentStyle, backgroundColor: bgColor, color: textColor}} 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} style={{...closeButtonStyle, color: textColor}}>✕</button>
        
        <div style={{ textAlign: 'center' }}>
          <img 
            src={country.flags.svg} 
            alt="Flag" 
            style={flagStyle} 
          />
          <h2 style={{ margin: '15px 0', fontSize: '20px' }}>{country.name.common}</h2>
        </div>

        <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: '15px' }}>
          <p style={textRow}><strong style={{color: subTextColor}}>Official:</strong> {country.name.official}</p>
          <p style={textRow}><strong style={{color: subTextColor}}>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
          <p style={textRow}>
            <strong style={{color: subTextColor}}>Currency:</strong> {Object.keys(country.currencies || {})[0]}
          </p>
        </div>

        <button onClick={onClose} style={dismissBtn}>
          Close Preview
        </button>
      </div>
    </div>
  );
};

// --- Styles ---
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', 
  alignItems: 'center', zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  padding: '25px', borderRadius: '12px', width: '90%', maxWidth: '380px', 
  position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', transition: '0.3s'
};

const flagStyle = { width: '100%', maxHeight: '140px', objectFit: 'contain' as const, borderRadius: '4px' };
const textRow = { margin: '8px 0', fontSize: '14px' };
const closeButtonStyle: React.CSSProperties = {
  position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer'
};
const dismissBtn = {
  marginTop: '20px', width: '100%', padding: '10px', backgroundColor: '#007bff', 
  color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
};