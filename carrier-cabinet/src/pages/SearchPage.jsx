import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CompanyCard from '../components/CompanyCard';
import SendRequestDialog from '../components/SendRequestDialog';

const regions = ['Все регионы', 'Москва', 'Казань', 'Архангельск', 'Ростов-на-Дону', 'Екатеринбург', 'Новосибирск', 'Самара', 'Владивосток', 'Краснодар', 'Санкт-Петербург'];
const cargoTypes = ['Все типы', 'Паллеты', 'Негабарит', 'Стройматериалы', 'Пищевые продукты', 'Температурный груз', 'Пиломатериалы', 'Контейнеры', 'Зерно', 'Короба'];

export default function SearchPage({ companies, onSendRequest, onReapply, onClickCard }) {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('Все регионы');
  const [cargoFilter, setCargoFilter] = useState('Все типы');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const filtered = companies.filter((c) => {
    if (c.status !== 'none' && c.status !== 'rejected') return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (regionFilter !== 'Все регионы' && c.region !== regionFilter) return false;
    if (cargoFilter !== 'Все типы' && !c.cargoTypes.includes(cargoFilter)) return false;
    return true;
  });

  const handleSendRequest = (companyId) => {
    setSelectedCompanyId(companyId);
    setDialogOpen(true);
  };

  const handleDialogSend = () => {
    onSendRequest(selectedCompanyId);
    setDialogOpen(false);
  };

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: '24px' }}>Поиск перевозчиков</Typography>

      <Box sx={{ display: 'flex', gap: '12px', mb: '24px', flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 20, color: '#9AA1AC' }} />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 260 }}
        />
        <TextField
          size="small"
          select
          label="Регион"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          {regions.map((r) => (
            <MenuItem key={r} value={r}>{r}</MenuItem>
          ))}
        </TextField>
        <TextField
          size="small"
          select
          label="Тип груза"
          value={cargoFilter}
          onChange={(e) => setCargoFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          {cargoTypes.map((t) => (
            <MenuItem key={t} value={t}>{t}</MenuItem>
          ))}
        </TextField>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px',
        }}
      >
        {filtered.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onSendRequest={handleSendRequest}
            onReapply={onReapply}
            onClickCard={onClickCard}
          />
        ))}
      </Box>

      {filtered.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: '48px', color: '#5C6370' }}>
          Компании не найдены
        </Typography>
      )}

      <SendRequestDialog
        open={dialogOpen}
        companyName={selectedCompany?.name || ''}
        onClose={() => setDialogOpen(false)}
        onSend={handleDialogSend}
      />
    </Box>
  );
}
