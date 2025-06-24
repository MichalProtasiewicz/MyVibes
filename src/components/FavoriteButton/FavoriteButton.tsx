import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import React from 'react';
import { useFavoritesContext } from '../../hooks/useFavoritesContext';
import type { SpotifySearchItem } from '../../types/spotify';

interface Props {
  item: SpotifySearchItem;
}

const FavoriteButton: React.FC<Props> = ({ item }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();

  const favorite = isFavorite(item);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  return (
    <IconButton
      aria-label={favorite ? 'remove from favorites' : 'add to favorites'}
      onClick={toggleFavorite}
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        '&:hover': {
          backgroundColor: '#fff',
        },
        color: favorite ? 'red' : 'inherit',
      }}
    >
      {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton; 