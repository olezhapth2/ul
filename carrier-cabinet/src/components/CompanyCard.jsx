import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import StatusBadge from './StatusBadge';
import MatchBlock from './MatchBlock';

export default function CompanyCard({ company, onSendRequest, onReapply, onClickCard }) {
  const isRejected = company.status === 'rejected';
  const canReapply = isRejected && (
    !company.reapplyAvailableDate || new Date(company.reapplyAvailableDate) <= new Date()
  );
  const reapplyBlocked = isRejected && company.reapplyAvailableDate && new Date(company.reapplyAvailableDate) > new Date();

  return (
    <Card
      sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3 } }}
      onClick={() => onClickCard(company.id)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div">
            {company.name}
          </Typography>
          {isRejected && <StatusBadge status={company.status} />}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BusinessIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">{company.sphere}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">{company.region}</Typography>
          </Box>
        </Box>

        {company.matchReasons && company.matchReasons.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              Совпадения:
            </Typography>
            <MatchBlock matchReasons={company.matchReasons} />
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        {!isRejected && (
          <Button
            size="small"
            variant="contained"
            onClick={(e) => { e.stopPropagation(); onSendRequest(company.id); }}
          >
            Отправить запрос на аккредитацию
          </Button>
        )}
        {isRejected && !reapplyBlocked && (
          <Button
            size="small"
            variant="outlined"
            onClick={(e) => { e.stopPropagation(); onReapply(company.id); }}
          >
            Подать заявку повторно
          </Button>
        )}
        {reapplyBlocked && (
          <Tooltip title={`Повторная подача доступна ${company.reapplyAvailableDate}`}>
            <span>
              <Button size="small" variant="outlined" disabled>
                Подать заявку повторно
              </Button>
            </span>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}
