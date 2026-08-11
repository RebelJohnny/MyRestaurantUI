import { faIR } from '@mui/material/locale'
import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    primary: {
      main: '#818CF8',
      light: '#A5B4FC',
      dark: '#4F46E5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#67E8F9',
      light: '#A5F3FC',
      dark: '#06B6D4',
      contrastText: '#000000',
    },
    success: {
      main: '#34D399',
      light: '#D1FAE5',
      dark: '#10B981',
    },
    warning: {
      main: '#FBBF24',
      light: '#FEF3C7',
      dark: '#F59E0B',
    },
    error: {
      main: '#F87171',
      light: '#FEE2E2',
      dark: '#EF4444',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
      disabled: '#475569',
    },
    divider: '#334155',
  },
  typography: {
    fontFamily: '"Vazirmatn", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.3 },
    h3: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.3 },
    h4: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.4 },
    h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 },
    body1: { fontWeight: 400, fontSize: '0.9375rem', lineHeight: 1.7 },
    body2: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.7 },
    caption: { fontWeight: 400, fontSize: '0.75rem', lineHeight: 1.5 },
    button: { fontWeight: 600, fontSize: '0.875rem', textTransform: 'none', letterSpacing: 0 },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.2)',
    '0 2px 6px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.2)',
    '0 4px 12px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.2)',
    '0 6px 16px rgba(0,0,0,0.25), 0 3px 8px rgba(0,0,0,0.2)',
    '0 10px 24px rgba(0,0,0,0.3), 0 4px 10px rgba(0,0,0,0.2)',
    '0 14px 32px rgba(0,0,0,0.3), 0 6px 14px rgba(0,0,0,0.2)',
    '0 18px 40px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.2)',
    '0 22px 48px rgba(0,0,0,0.35), 0 10px 20px rgba(0,0,0,0.2)',
    '0 26px 56px rgba(0,0,0,0.35), 0 12px 24px rgba(0,0,0,0.2)',
    '0 30px 64px rgba(0,0,0,0.4), 0 14px 28px rgba(0,0,0,0.2)',
    '0 34px 72px rgba(0,0,0,0.4), 0 16px 32px rgba(0,0,0,0.2)',
    '0 38px 80px rgba(0,0,0,0.4), 0 18px 36px rgba(0,0,0,0.2)',
    '0 42px 88px rgba(0,0,0,0.45), 0 20px 40px rgba(0,0,0,0.2)',
    '0 46px 96px rgba(0,0,0,0.45), 0 22px 44px rgba(0,0,0,0.2)',
    '0 50px 104px rgba(0,0,0,0.45), 0 24px 48px rgba(0,0,0,0.2)',
    '0 54px 112px rgba(0,0,0,0.5), 0 26px 52px rgba(0,0,0,0.2)',
    '0 58px 120px rgba(0,0,0,0.5), 0 28px 56px rgba(0,0,0,0.2)',
    '0 62px 128px rgba(0,0,0,0.5), 0 30px 60px rgba(0,0,0,0.2)',
    '0 66px 136px rgba(0,0,0,0.5), 0 32px 64px rgba(0,0,0,0.2)',
    '0 70px 144px rgba(0,0,0,0.55), 0 34px 68px rgba(0,0,0,0.2)',
    '0 74px 152px rgba(0,0,0,0.55), 0 36px 72px rgba(0,0,0,0.2)',
    '0 78px 160px rgba(0,0,0,0.55), 0 38px 76px rgba(0,0,0,0.2)',
    '0 82px 168px rgba(0,0,0,0.6), 0 40px 80px rgba(0,0,0,0.2)',
    '0 86px 176px rgba(0,0,0,0.6), 0 42px 84px rgba(0,0,0,0.2)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 20px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)',
          color: '#0F172A',
          '&:hover': {
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid #334155',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            fontFamily: '"Vazirmatn", sans-serif',
            '&.Mui-focused fieldset': {
              borderColor: '#818CF8',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"Vazirmatn", sans-serif',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #334155',
          fontFamily: '"Vazirmatn", sans-serif',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#1E293B',
            borderRadius: '12px 12px 0 0',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
            fontSize: '0.875rem',
            color: '#94A3B8',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #1E293B',
            fontSize: '0.875rem',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#1E293B',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #334155',
          },
        },
      },
    },
  },
}, faIR)
