import { useFavoritesContext } from 'hooks/useFavoritesContext';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { searchVariants, type SearchType } from '../types/searchType';
import CardElement from '../components/CardElement';

const MyFavoritesPage = () => {
  const { favorites } = useFavoritesContext();
  const [tab, setTab] = useState<SearchType>('track');

  const filtered = favorites.filter((item) => item.type === tab);

  return (
    <>
      <Box sx={{ mb: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Moje ulubione
        </Typography>
      </Box>
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        aria-label="favorites tabs"
        className="mb-4"
      >
        {searchVariants.map((variant) => (
          <Tab
            key={variant.value}
            label={variant.label}
            value={variant.value}
          />
        ))}
      </Tabs>

      {filtered.length === 0 ? (
        <Typography color="textSecondary">
          Brak ulubionych w tej kategorii.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((item) => (
            <CardElement key={item.id} item={item} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default MyFavoritesPage;
