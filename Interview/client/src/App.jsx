import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Admin pages
import Home from './pages/admin/Home';
import SetTest from './pages/admin/SetTest';
import AddTest from './pages/admin/AddTest';
import AllUsers from './pages/admin/AllUsers';

// User pages
import Rules from './pages/user/Rules';
import Login from './pages/user/Login';
import Test from './pages/user/Test';
import Thanks from './pages/user/Thanks';
import Result from './pages/user/Result';
import Welcome from './pages/user/Welcome';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/set-test/:quizId?" element={<SetTest />} />
        <Route path="/admin/add-test" element={<AddTest />} />
        <Route path="/admin/all-users/:quizId" element={<AllUsers />} />

        {/* User Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/rules/:quizId?" element={<Rules />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test/:quizId" element={<Test />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/result/:quizId" element={<Result />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </BrowserRouter>
  );
  };

export default App;