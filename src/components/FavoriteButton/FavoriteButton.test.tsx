import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteButton from './FavoriteButton';
import type { SpotifySearchItem } from '../../types/spotify';
import { vi, describe, it, expect } from 'vitest';
import * as favoritesContext from '../../hooks/useFavoritesContext';

vi.mock('../../hooks/useFavoritesContext', () => ({
  useFavoritesContext: () => ({
    isFavorite: vi.fn((item) => item.id === 'fav'),
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
  }),
}));

describe('FavoriteButton', () => {
  const item: SpotifySearchItem = {
    id: 'test',
    name: 'Test Track',
    type: 'track',
    album: {
      id: 'album1',
      name: 'Test Album',
      release_date: '2020-01-01',
      images: [],
      external_urls: { spotify: '' },
    },
    artists: [],
    duration_ms: 1000,
    explicit: false,
    popularity: 10,
    preview_url: null,
    external_urls: { spotify: '' },
  };

  it('should render correctly', () => {
    render(<FavoriteButton item={item} />);
    expect(screen.getByLabelText(/add to favorites/i)).toBeInTheDocument();
  });

  it('should call addFavorite when clicked and item is not favorite', () => {
    const addFavorite = vi.fn();
    const removeFavorite = vi.fn();
    vi.spyOn(favoritesContext, 'useFavoritesContext').mockReturnValue({
      favorites: [],
      reloadFavorites: vi.fn(),
      isFavorite: () => false,
      addFavorite,
      removeFavorite,
    });
    render(<FavoriteButton item={item} />);
    fireEvent.click(screen.getByRole('button'));
    expect(addFavorite).toHaveBeenCalledWith(item);
  });

  it('should call removeFavorite when clicked and item is favorite', () => {
    const addFavorite = vi.fn();
    const removeFavorite = vi.fn();
    vi.spyOn(favoritesContext, 'useFavoritesContext').mockReturnValue({
      favorites: [],
      reloadFavorites: vi.fn(),
      isFavorite: () => true,
      addFavorite,
      removeFavorite,
    });
    render(<FavoriteButton item={item} />);
    fireEvent.click(screen.getByRole('button'));
    expect(removeFavorite).toHaveBeenCalledWith(item);
  });
});
