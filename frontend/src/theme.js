import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B3A6B',
      light: '#2A52A0',
      dark: '#0F2444',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0D7377',
      light: '#14AAAF',
      dark: '#085254',
    },
    success: { main: '#2E7D32', light: '#E8F5E9' },
    error:   { main: '#C62828', light: '#FFEBEE' },
    warning: { main: '#E65100', light: '#FFF3E0' },
    background: {
      default: '#F0F4F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1a202c',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          fontSize: '0.875rem',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1B3A6B 0%, #2A52A0 100%)',
          boxShadow: '0 4px 15px rgba(27,58,107,0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0F2444 0%, #1B3A6B 100%)',
            boxShadow: '0 6px 20px rgba(27,58,107,0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover fieldset': { borderColor: '#1B3A6B' },
            '&.Mui-focused fieldset': { borderColor: '#1B3A6B', borderWidth: 2 },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 500, fontSize: '0.75rem' },
      },
    },
  },
})

export default theme
