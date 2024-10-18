import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import AddVideo from './pages/AddVideo';
import { Button } from './components/button';
import styles from './app.module.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <h1 role='button' onClick={() => navigate('/')} className={styles.pageTitle}>Videos</h1>
      <Button primary onClick={() => navigate('/add-video')}>Add video</Button>
    </header>
  );
};

export const App = () => {  
  return (
    <Router>
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>
          <h1>VManager Demo v0.0.1</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-video" element={<AddVideo />} />
          </Routes>
        </main>
        <footer className={styles.footer}>VManager Demo v0.0.1</footer>
      </div>
    </Router>
  );
};
