import AppRouter from '@/router';
import Header from '@components/header';
import Footer from '@/components/footer';
import './index.scss';

const App = () => {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
};

export default App;
