import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PageNotFound from './pages/auth/PageNotFound';
import MahasiswaList from './pages/mahasiswa/MahasiswaList';
import DetailMahasiswa from './pages/mahasiswa/DetailMahasiswa';
import AddMahasiswa from './pages/mahasiswa/AddMahasiswa';
import UpdateMahasiswa from './pages/mahasiswa/UpdateMahasiswa';
import Profile from './pages/auth/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './features/auth/authSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      dispatch(getUserInfo());
    }
  }, [dispatch]);

  const access_token = useSelector((state) => state.auth.user);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />}/>
         
          
           <Route path="mahasiswa" element={access_token ? <MahasiswaList /> : <Navigate to="/login" />} />
           <Route path="profile" element={access_token ? <Profile /> : <Navigate to="/login" />} />
           <Route path="mahasiswa/add" element={access_token ? <AddMahasiswa /> : <Navigate to="/login" />} />
           <Route path="/mahasiswa/detail/:id/" element={access_token ? <DetailMahasiswa /> : <Navigate to="/login" />} />
           <Route path="/mahasiswa/update/:id/" element={access_token ? <UpdateMahasiswa /> : <Navigate to="/login" />} />
           <Route path="*"element={access_token ? <PageNotFound /> : <Navigate to="/login" />}/>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
