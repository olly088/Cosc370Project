import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './components/Dashboard';
import BudgetView from './components/BudgetView';
import TrendPage from './components/TrendPage';
import NotificationsPage from './components/NotificationsPage';
import ContactPage from './components/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/budget/:id" element={<BudgetView />} />
        <Route path="/budget/:id/trends" element={<TrendPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}
