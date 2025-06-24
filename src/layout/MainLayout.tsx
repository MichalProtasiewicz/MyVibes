import { AppBar, Toolbar, Button, Tooltip, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { FavoritesProvider } from 'hooks/useFavoritesContext';

import FavoriteIcon from '@mui/icons-material/Favorite';

const MainLayout = () => {
  return (
    <FavoritesProvider>
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        className="bg-white border-b border-gray-200"
      >
        <Toolbar className="flex justify-between">
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className="text-black no-underline hover:opacity-80"
          >
            MyVibes
          </Typography>
          <Tooltip title="Przejdź do ulubionych">
            <Button
              component={Link}
              to="/favorites"
              variant="text"
              startIcon={<FavoriteIcon />}
              className="text-blue-600 hover:text-blue-800"
            >
              Ulubione
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <main className="w-screen pt-16 px-4 mx-auto h-screen">
        <Outlet />
      </main>
    </FavoritesProvider>
  );
};

export default MainLayout;
