import { Route, Routes } from 'react-router-dom';
import Home from '@pages/home';
import Favorite from '@pages/favorite';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/movie-app/" element={<Home />} />
      <Route path="/movie-app/favorites" element={<Favorite />} />
    </Routes>
  );
};

export default AppRouter;
