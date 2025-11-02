import { Route, Routes } from 'react-router-dom';
import Home from '@pages/home';
import Favorite from '@pages/favorite';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="%BASE_URL%/" element={<Home />} />
      <Route path="%BASE_URL%/favorites" element={<Favorite />} />
    </Routes>
  );
};

export default AppRouter;
