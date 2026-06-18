import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import theme from './theme';
import { initialCompanies } from './data/companies';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';

function SegmentedTabs({ value, onChange, disabled }) {
  const tabs = [
    { value: 'search', label: 'Поиск', icon: <SearchIcon sx={{ fontSize: 18 }} /> },
    { value: 'profile', label: 'Профиль', icon: <PersonIcon sx={{ fontSize: 18 }} /> },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '3px',
        gap: '2px',
      }}
    >
      {tabs.map((tab) => (
        <Box
          key={tab.value}
          onClick={() => !disabled?.includes(tab.value) && onChange(tab.value)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            px: '14px',
            py: '7px',
            borderRadius: '6px',
            cursor: disabled?.includes(tab.value) ? 'not-allowed' : 'pointer',
            opacity: disabled?.includes(tab.value) ? 0.4 : 1,
            backgroundColor: value === tab.value ? '#5B5FEF' : 'transparent',
            color: value === tab.value ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
            fontWeight: 500,
            fontSize: 14,
            transition: 'all 150ms ease',
            '&:hover': value !== tab.value && !disabled?.includes(tab.value)
              ? { backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.9)' }
              : {},
          }}
        >
          {tab.icon}
          {tab.label}
        </Box>
      ))}
    </Box>
  );
}

export default function App() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [screen, setScreen] = useState('search');
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const showSnackbar = (message) => setSnackbar({ open: true, message });

  const updateCompanyStatus = (id, newStatus) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const updated = { ...c, status: newStatus };
        if (newStatus === 'none') {
          delete updated.requestSentDate;
          delete updated.estimatedResponseDays;
          delete updated.activeRequests;
        }
        if (newStatus === 'pending') {
          updated.requestSentDate = new Date().toISOString().split('T')[0];
          updated.estimatedResponseDays = 5;
        }
        return updated;
      })
    );
  };

  const handleSendRequest = (companyId) => {
    updateCompanyStatus(companyId, 'pending');
    showSnackbar('Запрос отправлен');
  };

  const handleReapply = (companyId) => {
    updateCompanyStatus(companyId, 'pending');
    showSnackbar('Заявка подана повторно');
  };

  const handleCancelRequest = (companyId) => {
    updateCompanyStatus(companyId, 'none');
    showSnackbar('Запрос отменён');
  };

  const handleTerminate = (companyId) => {
    updateCompanyStatus(companyId, 'none');
    showSnackbar('Отношения разорваны');
  };

  const handleClickCard = (companyId) => {
    setSelectedCompanyId(companyId);
    setScreen('profile');
  };

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#15171C',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        }}
      >
        <Toolbar sx={{ gap: '16px' }}>
          <LocalShippingIcon sx={{ fontSize: 24, opacity: 0.9 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, fontSize: 16 }}>
            Кабинет перевозчика
          </Typography>

          <SegmentedTabs
            value={screen}
            onChange={setScreen}
            disabled={screen === 'profile' && !selectedCompanyId ? ['profile'] : []}
          />

          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ml: '8px',
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
              ОД
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: '32px' }}>
        {screen === 'search' && (
          <SearchPage
            companies={companies}
            onSendRequest={handleSendRequest}
            onReapply={handleReapply}
            onClickCard={handleClickCard}
          />
        )}
        {screen === 'profile' && selectedCompany && (
          <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            <ProfilePage
              company={selectedCompany}
              onBack={() => setScreen('search')}
              onChangeStatus={updateCompanyStatus}
              onSendRequest={handleSendRequest}
              onCancelRequest={handleCancelRequest}
              onTerminate={handleTerminate}
              onReapply={handleReapply}
            />
          </Box>
        )}
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
