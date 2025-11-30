/**
 * Sistema de Diseño - Secret Santa App
 * Paleta de colores, tipografía, sombras y utilidades
 */

export const theme = {
  colors: {
    // Colores principales
    primary: {
      main: '#D32F2F',      // Rojo festivo elegante
      light: '#FF6659',     // Rojo claro para hovers
      dark: '#9A0007',      // Rojo oscuro para contraste
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#D32F2F',
      600: '#C62828',
      700: '#B71C1C',
      800: '#9A0007',
      900: '#7F0000',
    },
    
    // Colores secundarios
    secondary: {
      main: '#1B5E20',      // Verde pino
      light: '#4C8C4A',     // Verde claro
      dark: '#003300',      // Verde oscuro
      50: '#E8F5E9',
      100: '#C8E6C9',
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: '#1B5E20',
      600: '#2E7D32',
      700: '#1B5E20',
      800: '#1B5E20',
      900: '#003300',
    },
    
    // Colores de acento
    accent: {
      gold: '#FFD700',      // Dorado para detalles especiales
      snow: '#F8F9FA',      // Blanco nieve
      silver: '#C0C0C0',    // Plateado
    },
    
    // Escala de grises
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    
    // Estados
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // Fondos
    background: {
      default: '#FFFFFF',
      paper: '#FAFAFA',
      dark: '#1A1A1A',
    },
    
    // Texto
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
      hint: '#9E9E9E',
      white: '#FFFFFF',
    }
  },
  
  // Gradientes
  gradients: {
    hero: 'linear-gradient(135deg, #D32F2F 0%, #1B5E20 100%)',
    heroAlt: 'linear-gradient(135deg, #9A0007 0%, #003300 100%)',
    card: 'linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)',
    festive: 'linear-gradient(90deg, #D32F2F 0%, #FFD700 50%, #1B5E20 100%)',
    snow: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.7) 100%)',
  },
  
  // Sombras
  shadows: {
    none: 'none',
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.2)',
    xl: '0 12px 48px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    glow: '0 0 20px rgba(211, 47, 47, 0.3)',
    glowGreen: '0 0 20px rgba(27, 94, 32, 0.3)',
    glowGold: '0 0 20px rgba(255, 215, 0, 0.5)',
  },
  
  // Tipografía
  typography: {
    fontFamily: {
      heading: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      accent: '"Playfair Display", Georgia, serif',
      mono: '"Fira Code", "Courier New", monospace',
    },
    
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    }
  },
  
  // Espaciado
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },
  
  // Bordes
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  borderWidth: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
  
  // Breakpoints
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
  
  // Z-index
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
  
  // Transiciones
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
    slowest: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Animaciones
  animations: {
    fadeIn: 'fadeIn 0.3s ease-in',
    fadeOut: 'fadeOut 0.3s ease-out',
    slideUp: 'slideUp 0.3s ease-out',
    slideDown: 'slideDown 0.3s ease-out',
    scaleIn: 'scaleIn 0.2s ease-out',
    spin: 'spin 1s linear infinite',
    bounce: 'bounce 1s infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  }
};

// Utilidades de tema
export const getColor = (path) => {
  const keys = path.split('.');
  let value = theme.colors;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return null;
  }
  
  return value;
};

export const getSpacing = (multiplier) => {
  return theme.spacing[multiplier] || `${multiplier * 0.25}rem`;
};

// Exportar como default también
export default theme;
