import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
import MyFavoritesPage from './pages/MyFavoritesPage';
import MainLayout from 'layout/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/details/:type/:id" element={<DetailsPage />} />
          <Route path="/favorites" element={<MyFavoritesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
