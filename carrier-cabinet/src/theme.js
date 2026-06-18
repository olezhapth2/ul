import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5B5FEF',
      light: '#7B7FF5',
      dark: '#3E42C7',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7F8FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#15171C',
      secondary: '#5C6370',
    },
    divider: '#E4E7EC',
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: 28,
      fontWeight: 700,
      lineHeight: 1.3,
      color: '#15171C',
    },
    h2: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#15171C',
    },
    h3: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#15171C',
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.6,
      color: '#15171C',
    },
    body2: {
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#5C6370',
    },
    caption: {
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: '#5C6370',
    },
    button: {
      fontSize: 14,
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--bg': '#F7F8FA',
          '--surface': '#FFFFFF',
          '--border': '#E4E7EC',
          '--text-primary': '#15171C',
          '--text-secondary': '#5C6370',
          '--header-bg': '#15171C',
          '--accent': '#5B5FEF',
          '--accent-8': 'rgba(91,95,239,0.08)',
          '--accent-16': 'rgba(91,95,239,0.16)',
          '--status-none-bg': '#F1F2F4',
          '--status-none-text': '#9AA1AC',
          '--status-pending-bg': '#FFF6DD',
          '--status-pending-text': '#B98900',
          '--status-accredited-bg': '#E7F7EE',
          '--status-accredited-text': '#1A8754',
          '--status-rejected-bg': '#FDE8E8',
          '--status-rejected-text': '#D33A3A',
          fontFamily: ['Inter', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'].join(','),
        },
        body: {
          margin: 0,
          backgroundColor: '#F7F8FA',
        },
        '*:focus-visible': {
          outline: '2px solid #5B5FEF',
          outlineOffset: 2,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #E4E7EC',
          boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
          transition: 'box-shadow 150ms ease, transform 150ms ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(16,24,40,0.08)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 14,
          textTransform: 'none',
          padding: '8px 16px',
          transition: 'all 150ms ease',
          '&:focus-visible': {
            outline: '2px solid #5B5FEF',
            outlineOffset: 2,
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 2px 8px rgba(91,95,239,0.25)',
          },
        },
        outlined: {
          borderColor: '#E4E7EC',
          '&:hover': {
            borderColor: '#5B5FEF',
            backgroundColor: 'rgba(91,95,239,0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          fontWeight: 500,
          fontSize: 13,
          height: 28,
          transition: 'all 150ms ease',
          '&:focus-visible': {
            outline: '2px solid #5B5FEF',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          minHeight: 36,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            fontSize: 14,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#9AA1AC',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#5B5FEF',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: 14,
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          '& .MuiStepConnector-line': {
            borderColor: '#E4E7EC',
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontSize: 14,
            borderColor: '#E4E7EC',
          },
        },
      },
    },
  },
});

export default theme;
