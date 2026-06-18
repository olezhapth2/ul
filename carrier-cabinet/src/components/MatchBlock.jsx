import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RouteIcon from '@mui/icons-material/Route';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const iconMap = {
  'Часто публикует грузы по вашему направлению': <RouteIcon sx={{ fontSize: 14 }} />,
  'Совпадение по типу груза': <LocalShippingIcon sx={{ fontSize: 14 }} />,
  'Высокий объём отправок': <TrendingUpIcon sx={{ fontSize: 14 }} />,
};

export default function MatchBlock({ matchReasons, compact }) {
  if (!matchReasons || matchReasons.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Нет совпадений
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {matchReasons.map((reason, i) => {
        const isPrimary = i === 0 && matchReasons.length >= 2;
        return (
          <Box
            key={i}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              px: '8px',
              py: '3px',
              borderRadius: '100px',
              backgroundColor: isPrimary ? 'rgba(91,95,239,0.16)' : 'rgba(91,95,239,0.08)',
              color: '#5B5FEF',
              fontSize: compact ? 12 : 13,
              fontWeight: 500,
              lineHeight: 1.3,
              whiteSpace: 'nowrap',
            }}
          >
            {iconMap[reason]}
            {reason}
          </Box>
        );
      })}
    </Box>
  );
}
