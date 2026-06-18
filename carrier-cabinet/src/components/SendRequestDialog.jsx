import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function SendRequestDialog({ open, companyName, onClose, onSend }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onSend(message);
    setMessage('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: 16, fontWeight: 600, pb: '8px' }}>
        Запрос на аккредитацию
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: '16px', color: '#5C6370' }}>
          {companyName}
        </Typography>
        <TextField
          autoFocus
          label="Сообщение (необязательно)"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Опишите ваш запрос или оставьте поле пустым"
        />
      </DialogContent>
      <DialogActions sx={{ px: '24px', pb: '16px' }}>
        <Button onClick={onClose} variant="outlined">Отмена</Button>
        <Button onClick={handleSend} variant="contained">Отправить</Button>
      </DialogActions>
    </Dialog>
  );
}
