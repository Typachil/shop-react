import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import './css/App.css';
import './css/header.css';
import './css/main.css';
import './css/popupCart.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
