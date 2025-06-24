import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { type SearchType, searchVariants } from 'types/searchType';

export interface SearchFormProps {
  onSubmit: (query: string, type: SearchType) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<SearchType>('track');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') return;
    onSubmit(query.trim(), type);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-4">
      <div className="flex gap-5">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Szukaj w Spotify..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          className="bg-white"
        />
        <Button type="submit" variant="contained" disabled={!query}>
          Wyszukaj
        </Button>
      </div>
      <div className="mt-4">
        <FormLabel component="legend" className="text-gray-700">
          Szukaj w:
        </FormLabel>
        <RadioGroup
          row
          value={type}
          onChange={(e) => setType(e.target.value as SearchType)}
        >
          {searchVariants.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio />}
              label={item.label}
              className="mr-4"
            />
          ))}
        </RadioGroup>
      </div>
    </form>
  );
};

export default SearchForm;
