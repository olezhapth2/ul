import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import RouteIcon from '@mui/icons-material/Route';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const iconMap = {
  'Часто публикует грузы по вашему направлению': <RouteIcon fontSize="small" />,
  'Совпадение по типу груза': <LocalShippingIcon fontSize="small" />,
  'Высокий объём отправок': <TrendingUpIcon fontSize="small" />,
};

export default function MatchBlock({ matchReasons }) {
  if (!matchReasons || matchReasons.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Нет совпадений
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {matchReasons.map((reason, i) => (
        <Chip
          key={i}
          icon={iconMap[reason] || undefined}
          label={reason}
          size="small"
          variant="outlined"
          sx={{ fontSize: '0.75rem' }}
        />
      ))}
    </Box>
  );
}
