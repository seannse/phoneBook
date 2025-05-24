import { Layout } from './components';
import { Navigate, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage/HomePage';
// import LoginPage from './pages/LoginPage/LoginPage';
// import RegisterPage from './pages/RegisterPage/RegisterPage';
// import ContactsPage from './pages/ContactsPage/ContactsPage';
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const ContactDetailPage = lazy(() =>
  import('./pages/ContactDetailPage/ContactDetailPage')
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/contact/:contactId" element={<ContactDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
