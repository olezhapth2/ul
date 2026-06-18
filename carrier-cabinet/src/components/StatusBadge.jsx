import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const statusConfig = {
  none: {
    label: 'Не аккредитована',
    color: '#9AA1AC',
    bg: '#F1F2F4',
  },
  pending: {
    label: 'Запрос отправлен',
    color: '#B98900',
    bg: '#FFF6DD',
  },
  accredited: {
    label: 'Аккредитована',
    color: '#1A8754',
    bg: '#E7F7EE',
  },
  rejected: {
    label: 'Отказано',
    color: '#D33A3A',
    bg: '#FDE8E8',
  },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.none;

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        px: '10px',
        py: '4px',
        borderRadius: '100px',
        backgroundColor: config.bg,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: config.color,
          flexShrink: 0,
        }}
      />
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 500,
          color: config.color,
          lineHeight: 1.3,
          whiteSpace: 'nowrap',
        }}
      >
        {config.label}
      </Typography>
    </Box>
  );
}
