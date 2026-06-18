import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StatusBadge from '../components/StatusBadge';
import MatchBlock from '../components/MatchBlock';
import CompanyProfile from '../components/CompanyProfile';
import SendRequestDialog from '../components/SendRequestDialog';

const statusOptions = ['none', 'pending', 'accredited', 'rejected'];
const statusLabels = {
  none: 'Не аккредитована',
  pending: 'Запрос отправлен',
  accredited: 'Аккредитована',
  rejected: 'Отказано',
};

export default function ProfilePage({ company, onBack, onChangeStatus, onSendRequest, onCancelRequest, onTerminate, onReapply }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [demoStatus, setDemoStatus] = useState(company.status);

  const handleSendRequest = (companyId) => {
    setDialogOpen(true);
  };

  const handleDialogSend = () => {
    onSendRequest(company.id);
    setDialogOpen(false);
  };

  const handleDemoStatusChange = (newStatus) => {
    setDemoStatus(newStatus);
    onChangeStatus(company.id, newStatus);
  };

  const displayCompany = { ...company, status: demoStatus };

  return (
    <Box>
      <Button onClick={onBack} sx={{ mb: 2 }}>
        ← Назад к поиску
      </Button>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ mb: 1 }}>{company.name}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <DescriptionIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">ИНН: {company.inn}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">{company.region}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <BusinessIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">{company.sphere}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocalShippingIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">Отправок в месяц: {company.shipmentsPerMonth}</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
            <StatusBadge status={demoStatus} />
            {company.matchReasons && company.matchReasons.length > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                  Совпадения:
                </Typography>
                <MatchBlock matchReasons={company.matchReasons} />
              </Box>
            )}
          </Box>
        </Box>
      </Paper>

      <Paper
        sx={{
          p: 2,
          mb: 3,
          border: '1px dashed #bdbdbd',
          backgroundColor: '#fafafa',
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          Режим демо
        </Typography>
        <TextField
          size="small"
          select
          label="Статус (демо)"
          value={demoStatus}
          onChange={(e) => handleDemoStatusChange(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {statusOptions.map((s) => (
            <MenuItem key={s} value={s}>{statusLabels[s]}</MenuItem>
          ))}
        </TextField>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <CompanyProfile
          company={displayCompany}
          onSendRequest={handleSendRequest}
          onCancelRequest={onCancelRequest}
          onTerminate={onTerminate}
          onReapply={onReapply}
        />
      </Paper>

      <SendRequestDialog
        open={dialogOpen}
        companyName={company.name}
        onClose={() => setDialogOpen(false)}
        onSend={handleDialogSend}
      />
    </Box>
  );
}
