import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
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

  const handleDialogSend = (message) => {
    onSendRequest(selectedCompanyId);
    setDialogOpen(false);
  };

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Поиск перевозчиков</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 250 }}
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

      <Grid container spacing={2}>
        {filtered.map((company) => (
          <Grid item xs={12} md={6} key={company.id}>
            <CompanyCard
              company={company}
              onSendRequest={handleSendRequest}
              onReapply={onReapply}
              onClickCard={onClickCard}
            />
          </Grid>
        ))}
      </Grid>

      {filtered.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
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
