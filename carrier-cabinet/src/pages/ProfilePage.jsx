import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import SettingsIcon from '@mui/icons-material/Settings';
import StatusBadge from '../components/StatusBadge';
import MatchBlock from '../components/MatchBlock';
import CompanyProfile from '../components/CompanyProfile';
import SendRequestDialog from '../components/SendRequestDialog';
import { getAvatarColor, getInitials } from '../utils/avatar';

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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSendRequest = () => {
    setDialogOpen(true);
  };

  const handleDialogSend = () => {
    onSendRequest(company.id);
    setDialogOpen(false);
  };

  const handleDemoStatusChange = (newStatus) => {
    setDemoStatus(newStatus);
    onChangeStatus(company.id, newStatus);
    setAnchorEl(null);
  };

  const displayCompany = { ...company, status: demoStatus };

  return (
    <Box>
      <Button
        onClick={onBack}
        sx={{ mb: '16px', color: '#5C6370', textTransform: 'none', fontWeight: 500 }}
      >
        &larr; Назад к поиску
      </Button>

      <Paper
        sx={{
          p: '24px',
          mb: '24px',
          border: '1px solid #E4E7EC',
          boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: getAvatarColor(company.name),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#FFFFFF' }}>
              {getInitials(company.name)}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mb: '12px' }}>
              <Typography variant="h1" sx={{ flex: 1 }}>{company.name}</Typography>
              <StatusBadge status={demoStatus} />
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '8px 16px',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#5C6370' }}>
                ИНН
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#15171C' }}>{company.inn}</Typography>

              <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#5C6370' }}>
                Регион
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#15171C' }}>{company.region}</Typography>

              <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#5C6370' }}>
                Сфера
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#15171C' }}>{company.sphere}</Typography>

              <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#5C6370' }}>
                Отправок / мес
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#15171C' }}>{company.shipmentsPerMonth}</Typography>
            </Box>

            {company.matchReasons && company.matchReasons.length > 0 && (
              <Box sx={{ mt: '16px' }}>
                <Typography variant="caption" sx={{ mb: '6px', display: 'block', fontSize: 11 }}>
                  Совпадения
                </Typography>
                <MatchBlock matchReasons={company.matchReasons} />
              </Box>
            )}
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Chip
              icon={<SettingsIcon sx={{ fontSize: 14 }} />}
              label="demo"
              size="small"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                backgroundColor: '#F1F2F4',
                color: '#9AA1AC',
                fontSize: 11,
                fontWeight: 500,
                height: 24,
                '&:hover': { backgroundColor: '#E4E7EC' },
              }}
            />
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Box sx={{ p: '8px', minWidth: 180 }}>
                <Typography sx={{ fontSize: 11, color: '#5C6370', px: '8px', mb: '4px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                  Режим демо
                </Typography>
                {statusOptions.map((s) => (
                  <Box
                    key={s}
                    onClick={() => handleDemoStatusChange(s)}
                    sx={{
                      px: '8px',
                      py: '6px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: demoStatus === s ? 600 : 400,
                      backgroundColor: demoStatus === s ? 'rgba(91,95,239,0.08)' : 'transparent',
                      color: demoStatus === s ? '#5B5FEF' : '#15171C',
                      '&:hover': { backgroundColor: demoStatus === s ? 'rgba(91,95,239,0.08)' : '#F7F8FA' },
                    }}
                  >
                    {statusLabels[s]}
                  </Box>
                ))}
              </Box>
            </Popover>
          </Box>
        </Box>
      </Paper>

      <Paper
        sx={{
          p: '24px',
          border: '1px solid #E4E7EC',
          boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
          borderRadius: 3,
        }}
      >
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
