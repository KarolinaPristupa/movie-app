import AppRouter from '@/router';
import Header from '@components/header';
import './index.scss';

const App = () => {
  return (
    <div className="page">
      <Header />
      <AppRouter />
    </div>
  );
};

export default App;
