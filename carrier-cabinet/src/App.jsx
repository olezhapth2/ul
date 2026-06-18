import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import theme from './theme';
import { initialCompanies } from './data/companies';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';

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
      <AppBar position="static" sx={{ backgroundColor: '#202020' }}>
        <Toolbar>
          <LocalShippingIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Кабинет перевозчика
          </Typography>
          <Tabs
            value={screen}
            onChange={(_, v) => setScreen(v)}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab
              label="Поиск"
              value="search"
              icon={<SearchIcon />}
              iconPosition="start"
            />
            <Tab
              label="Профиль"
              value="profile"
              icon={<PersonIcon />}
              iconPosition="start"
              disabled={!selectedCompanyId}
            />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {screen === 'search' && (
          <SearchPage
            companies={companies}
            onSendRequest={handleSendRequest}
            onReapply={handleReapply}
            onClickCard={handleClickCard}
          />
        )}
        {screen === 'profile' && selectedCompany && (
          <ProfilePage
            company={selectedCompany}
            onBack={() => setScreen('search')}
            onChangeStatus={updateCompanyStatus}
            onSendRequest={handleSendRequest}
            onCancelRequest={handleCancelRequest}
            onTerminate={handleTerminate}
            onReapply={handleReapply}
          />
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
