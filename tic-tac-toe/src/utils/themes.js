// Theme definitions for the game
export const THEMES = {
  CLASSIC: 'classic',
  DARK: 'dark',
  NEON: 'neon',
  PASTEL: 'pastel',
  RETRO: 'retro'
};

// Theme color palettes
export const themeColors = {
  [THEMES.CLASSIC]: {
    background: 'radial-gradient(circle at top, rgba(241, 210, 70, 0.98), rgba(250, 176, 103, 0.87))',
    boardBackground: 'linear-gradient(#383624, #282617)',
    cellBackground: '#aca788',
    textPrimary: '#3f3b00',
    textSecondary: '#e1dec7',
    accent: '#f6e35a',
    highlight: '#f8c031',
    shadow: 'rgba(0, 0, 0, 0.5)',
    xColor: '#FF5252',
    oColor: '#4FC3F7'
  },
  [THEMES.DARK]: {
    background: 'radial-gradient(circle at top, #2c3e50, #1a1a2e)',
    boardBackground: 'linear-gradient(#121212, #1e1e1e)',
    cellBackground: '#2d3436',
    textPrimary: '#ecf0f1',
    textSecondary: '#bdc3c7',
    accent: '#3498db',
    highlight: '#2ecc71',
    shadow: 'rgba(0, 0, 0, 0.7)',
    xColor: '#e74c3c',
    oColor: '#3498db'
  },
  [THEMES.NEON]: {
    background: 'radial-gradient(circle at top, #000000, #1a1a2e)',
    boardBackground: 'linear-gradient(#121212, #1e1e1e)',
    cellBackground: '#2d3436',
    textPrimary: '#00ffff',
    textSecondary: '#ff00ff',
    accent: '#00ff00',
    highlight: '#ffff00',
    shadow: 'rgba(0, 255, 255, 0.5)',
    xColor: '#ff00ff',
    oColor: '#00ffff'
  },
  [THEMES.PASTEL]: {
    background: 'radial-gradient(circle at top, #ffeaa7, #fab1a0)',
    boardBackground: 'linear-gradient(#dfe6e9, #b2bec3)',
    cellBackground: '#ffffff',
    textPrimary: '#2d3436',
    textSecondary: '#636e72',
    accent: '#fdcb6e',
    highlight: '#e17055',
    shadow: 'rgba(0, 0, 0, 0.2)',
    xColor: '#e84393',
    oColor: '#0984e3'
  },
  [THEMES.RETRO]: {
    background: 'radial-gradient(circle at top, #4b4453, #6b6570)',
    boardBackground: 'linear-gradient(#2c2c54, #474787)',
    cellBackground: '#40407a',
    textPrimary: '#f7f1e3',
    textSecondary: '#d1ccc0',
    accent: '#ffda79',
    highlight: '#ffb142',
    shadow: 'rgba(0, 0, 0, 0.5)',
    xColor: '#ff5252',
    oColor: '#34ace0'
  }
};

// Apply theme to document
export function applyTheme(theme) {
  const colors = themeColors[theme] || themeColors[THEMES.CLASSIC];
  
  // Create CSS variables
  const root = document.documentElement;
  
  root.style.setProperty('--background', colors.background);
  root.style.setProperty('--board-background', colors.boardBackground);
  root.style.setProperty('--cell-background', colors.cellBackground);
  root.style.setProperty('--text-primary', colors.textPrimary);
  root.style.setProperty('--text-secondary', colors.textSecondary);
  root.style.setProperty('--accent', colors.accent);
  root.style.setProperty('--highlight', colors.highlight);
  root.style.setProperty('--shadow', colors.shadow);
  root.style.setProperty('--x-color', colors.xColor);
  root.style.setProperty('--o-color', colors.oColor);
}
