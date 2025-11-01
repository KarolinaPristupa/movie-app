import { Route, Routes } from 'react-router-dom';
import Home from '@pages/home';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
