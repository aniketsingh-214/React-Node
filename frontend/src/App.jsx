import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TablePage from './pages/TablePage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/table"
        element={
          <ProtectedRoute>
            <TablePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div style={{ padding: 30 }}>404 — Not found</div>} />
    </Routes>
  );
}
