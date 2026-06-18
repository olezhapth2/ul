import Chip from '@mui/material/Chip';

const statusConfig = {
  none: { label: 'Не аккредитована', color: 'default' },
  pending: { label: 'Запрос отправлен', color: 'warning' },
  accredited: { label: 'Аккредитована', color: 'success' },
  rejected: { label: 'Отказано', color: 'error' },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.none;
  return <Chip label={config.label} color={config.color} size="small" variant="outlined" />;
}
