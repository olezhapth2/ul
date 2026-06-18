import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';

function ConfirmDialog({ open, title, content, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Отмена</Button>
        <Button onClick={onConfirm} variant="contained" color="error">Подтвердить</Button>
      </DialogActions>
    </Dialog>
  );
}

function ProfileNone({ company, onSendRequest }) {
  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Компания {company.name} работает в сфере «{company.sphere}».
        Направления: {company.routes.join(', ')}.
        Отправок в месяц: {company.shipmentsPerMonth}.
      </Typography>
      <Button variant="contained" onClick={() => onSendRequest(company.id)}>
        Отправить запрос на аккредитацию
      </Button>
    </Box>
  );
}

function ProfilePending({ company, onCancel }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const steps = ['Заявка отправлена', 'На проверке у компании', 'Ожидаем решение'];

  return (
    <Box>
      <Stepper activeStep={1} orientation="vertical" sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {company.estimatedResponseDays && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Ожидаемое время ответа: до {company.estimatedResponseDays} рабочих дней
        </Typography>
      )}

      <Button variant="outlined" color="error" onClick={() => setConfirmOpen(true)}>
        Отменить запрос
      </Button>

      <ConfirmDialog
        open={confirmOpen}
        title="Отменить запрос?"
        content="Вы уверены, что хотите отменить запрос на аккредитацию?"
        onConfirm={() => { onCancel(); setConfirmOpen(false); }}
        onCancel={() => setConfirmOpen(false)}
      />
    </Box>
  );
}

function ProfileAccredited({ company, onTerminate }) {
  const [tab, setTab] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Заявки" />
        <Tab label="История сотрудничества" />
      </Tabs>

      {tab === 0 && (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Маршрут</TableCell>
                <TableCell>Тип груза</TableCell>
                <TableCell align="right">Ставка, руб/кг</TableCell>
                <TableCell align="right">Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {company.activeRequests?.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.route}</TableCell>
                  <TableCell>{req.cargoType}</TableCell>
                  <TableCell align="right">{req.rate}</TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" onClick={() => {}}>
                      Поставить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tab === 1 && (
        <Typography variant="body2" color="text.secondary">
          История сотрудничества пока пуста. Здесь будут отображаться завершённые перевозки и отзывы.
        </Typography>
      )}

      <Divider sx={{ my: 3 }} />

      <Button variant="outlined" color="error" onClick={() => setConfirmOpen(true)}>
        Разорвать отношения
      </Button>

      <ConfirmDialog
        open={confirmOpen}
        title="Разорвать отношения?"
        content="Вы уверены, что хотите разорвать отношения с этой компанией? Все активные заявки будут аннулированы."
        onConfirm={() => { onTerminate(); setConfirmOpen(false); }}
        onCancel={() => setConfirmOpen(false)}
      />
    </Box>
  );
}

function ProfileRejected({ company, onReapply }) {
  const canReapply = !company.reapplyAvailableDate || new Date(company.reapplyAvailableDate) <= new Date();
  const reapplyBlocked = company.reapplyAvailableDate && new Date(company.reapplyAvailableDate) > new Date();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CancelIcon color="error" fontSize="small" /> Причина отказа
        </Typography>
        <Typography variant="body2">{company.rejectionReason}</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Что исправить:</Typography>
        <List dense>
          {company.rejectionChecklist?.map((item, i) => (
            <ListItem key={i}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleOutlinedIcon color="action" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <InfoIcon color="action" fontSize="small" /> Когда можно повторить
        </Typography>
        <Typography variant="body2">
          {canReapply
            ? 'Уже можно подать заявку повторно'
            : `Повторная подача доступна с ${company.reapplyAvailableDate}`}
        </Typography>
      </Box>

      {reapplyBlocked ? (
        <Tooltip title={`Повторная подача доступна ${company.reapplyAvailableDate}`}>
          <span>
            <Button variant="contained" disabled>
              Подать заявку повторно
            </Button>
          </span>
        </Tooltip>
      ) : (
        <Button variant="contained" onClick={() => onReapply(company.id)}>
          Подать заявку повторно
        </Button>
      )}
    </Box>
  );
}

export default function CompanyProfile({ company, onSendRequest, onCancelRequest, onTerminate, onReapply }) {
  switch (company.status) {
    case 'none':
      return <ProfileNone company={company} onSendRequest={onSendRequest} />;
    case 'pending':
      return <ProfilePending company={company} onCancel={onCancelRequest} />;
    case 'accredited':
      return <ProfileAccredited company={company} onTerminate={onTerminate} />;
    case 'rejected':
      return <ProfileRejected company={company} onReapply={onReapply} />;
    default:
      return null;
  }
}
