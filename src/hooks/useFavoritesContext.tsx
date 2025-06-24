import { useState, useEffect, useContext, createContext } from 'react';
import type { ReactNode } from 'react';
import { openDB, type DBSchema } from 'idb';
import type { SpotifySearchItem } from 'types/spotify';

interface FavoritesDB extends DBSchema {
  favorites: {
    key: string;
    value: SpotifySearchItem;
    indexes: { 'by-type': string };
  };
}

const DB_NAME = 'favoritesDB';
const STORE_NAME = 'favorites';

async function getDB() {
  return openDB<FavoritesDB>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('by-type', 'type');
      }
    },
  });
}

interface FavoritesContextType {
  favorites: SpotifySearchItem[];
  addFavorite: (item: SpotifySearchItem) => Promise<void>;
  removeFavorite: (item: SpotifySearchItem) => Promise<void>;
  isFavorite: (item: SpotifySearchItem) => boolean;
  reloadFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<SpotifySearchItem[]>([]);

  const reloadFavorites = async () => {
    const db = await getDB();
    const allFavorites = await db.getAll(STORE_NAME);
    setFavorites(allFavorites);
  };

  useEffect(() => {
    reloadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFavorite = async (item: SpotifySearchItem) => {
    const db = await getDB();
    await db.put(STORE_NAME, item);
    setFavorites((prev) => {
      if (prev.find((fav) => fav.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFavorite = async (item: SpotifySearchItem) => {
    const db = await getDB();
    await db.delete(STORE_NAME, item.id);
    setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));
  };

  const isFavorite = (item: SpotifySearchItem) =>
    favorites.some((fav) => fav.id === item.id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, reloadFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
