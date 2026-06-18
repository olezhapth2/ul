import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import StatusBadge from './StatusBadge';
import MatchBlock from './MatchBlock';
import { getAvatarColor, getInitials } from '../utils/avatar';

export default function CompanyCard({ company, onSendRequest, onReapply, onClickCard }) {
  const isRejected = company.status === 'rejected';
  const canReapply = isRejected && (
    !company.reapplyAvailableDate || new Date(company.reapplyAvailableDate) <= new Date()
  );
  const reapplyBlocked = isRejected && company.reapplyAvailableDate && new Date(company.reapplyAvailableDate) > new Date();

  return (
    <Card
      sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
      onClick={() => onClickCard(company.id)}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', p: '16px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: getAvatarColor(company.name),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>
              {getInitials(company.name)}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <Typography variant="h2" noWrap>
                {company.name}
              </Typography>
              {isRejected && <StatusBadge status={company.status} />}
            </Box>

            <Typography variant="body2" sx={{ mt: '2px' }}>
              {company.sphere} · {company.region}
            </Typography>
          </Box>
        </Box>

        {company.matchReasons && company.matchReasons.length > 0 && (
          <Box>
            <Typography
              variant="caption"
              sx={{ mb: '4px', display: 'block', fontSize: 11 }}
            >
              Совпадения
            </Typography>
            <MatchBlock matchReasons={company.matchReasons} compact />
          </Box>
        )}
      </CardContent>

      <Divider sx={{ mx: '16px' }} />

      <CardActions sx={{ px: '16px', py: '12px !important' }}>
        {!isRejected && (
          <Button
            fullWidth
            variant="contained"
            onClick={(e) => { e.stopPropagation(); onSendRequest(company.id); }}
          >
            Отправить запрос на аккредитацию
          </Button>
        )}
        {isRejected && !reapplyBlocked && (
          <Button
            fullWidth
            variant="outlined"
            onClick={(e) => { e.stopPropagation(); onReapply(company.id); }}
          >
            Подать заявку повторно
          </Button>
        )}
        {reapplyBlocked && (
          <Tooltip title={`Повторная подача доступна ${company.reapplyAvailableDate}`}>
            <span style={{ width: '100%' }}>
              <Button fullWidth variant="outlined" disabled>
                Подать заявку повторно
              </Button>
            </span>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}
