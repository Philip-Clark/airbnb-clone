import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ListingPage from './components/ListingPage';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/listingPage" element={<ListingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
