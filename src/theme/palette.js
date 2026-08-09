import { createTheme } from '@mui/material/styles'

const palette = {
  primary: {
    main: '#4F46E5',
    light: '#818CF8',
    dark: '#3730A3',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#06B6D4',
    light: '#67E8F9',
    dark: '#0891B2',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#10B981',
    light: '#D1FAE5',
    dark: '#059669',
  },
  warning: {
    main: '#F59E0B',
    light: '#FEF3C7',
    dark: '#D97706',
  },
  error: {
    main: '#EF4444',
    light: '#FEE2E2',
    dark: '#DC2626',
  },
  info: {
    main: '#3B82F6',
    light: '#DBEAFE',
    dark: '#2563EB',
  },
  background: {
    default: '#F1F5F9',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    disabled: '#94A3B8',
  },
  divider: '#E2E8F0',
}

export const lightTheme = createTheme({
  direction: 'rtl',
  palette,
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
    '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    '0 2px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06)',
    '0 4px 12px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.05)',
    '0 6px 16px rgba(0,0,0,0.06), 0 3px 8px rgba(0,0,0,0.05)',
    '0 10px 24px rgba(0,0,0,0.07), 0 4px 10px rgba(0,0,0,0.05)',
    '0 14px 32px rgba(0,0,0,0.08), 0 6px 14px rgba(0,0,0,0.05)',
    '0 18px 40px rgba(0,0,0,0.09), 0 8px 16px rgba(0,0,0,0.05)',
    '0 22px 48px rgba(0,0,0,0.10), 0 10px 20px rgba(0,0,0,0.05)',
    '0 26px 56px rgba(0,0,0,0.10), 0 12px 24px rgba(0,0,0,0.05)',
    '0 30px 64px rgba(0,0,0,0.11), 0 14px 28px rgba(0,0,0,0.05)',
    '0 34px 72px rgba(0,0,0,0.11), 0 16px 32px rgba(0,0,0,0.05)',
    '0 38px 80px rgba(0,0,0,0.12), 0 18px 36px rgba(0,0,0,0.05)',
    '0 42px 88px rgba(0,0,0,0.12), 0 20px 40px rgba(0,0,0,0.05)',
    '0 46px 96px rgba(0,0,0,0.13), 0 22px 44px rgba(0,0,0,0.05)',
    '0 50px 104px rgba(0,0,0,0.13), 0 24px 48px rgba(0,0,0,0.05)',
    '0 54px 112px rgba(0,0,0,0.14), 0 26px 52px rgba(0,0,0,0.05)',
    '0 58px 120px rgba(0,0,0,0.14), 0 28px 56px rgba(0,0,0,0.05)',
    '0 62px 128px rgba(0,0,0,0.15), 0 30px 60px rgba(0,0,0,0.05)',
    '0 66px 136px rgba(0,0,0,0.15), 0 32px 64px rgba(0,0,0,0.05)',
    '0 70px 144px rgba(0,0,0,0.16), 0 34px 68px rgba(0,0,0,0.05)',
    '0 74px 152px rgba(0,0,0,0.16), 0 36px 72px rgba(0,0,0,0.05)',
    '0 78px 160px rgba(0,0,0,0.17), 0 38px 76px rgba(0,0,0,0.05)',
    '0 82px 168px rgba(0,0,0,0.17), 0 40px 80px rgba(0,0,0,0.05)',
    '0 86px 176px rgba(0,0,0,0.18), 0 42px 84px rgba(0,0,0,0.05)',
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
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4338CA 0%, #6D28D9 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
          border: '1px solid #F1F5F9',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
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
              borderColor: '#4F46E5',
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
          border: '1px solid #E2E8F0',
          fontFamily: '"Vazirmatn", sans-serif',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#F8FAFC',
            borderRadius: '12px 12px 0 0',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
            fontSize: '0.875rem',
            color: '#475569',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #F1F5F9',
            fontSize: '0.875rem',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#F8FAFC',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #E2E8F0',
          },
        },
      },
    },
  },
})
