import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import App from './App';
import ListingPage from './components/ListingPage';

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/listing/:id" element={<ListingPage />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;
