import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
// Pastikan Anda menyesuaikan path ke slice Redux Anda

const Navbar = () => {
  const user = useSelector((state) => state.auth.user); // Ambil informasi user dari Redux state
  const dispatch = useDispatch();

  const handlelogout = () =>{
    dispatch(logout())
  }

  return (
    <>
      <nav className="bg-gray-800 py-6">
        <div className="container">
          <div className="container mx-auto flex justify-between items-center">
            <Link to={'/'} className="text-white text-2xl font-bold">Brand</Link>
            <ul className="flex space-x-4">
              {user ? ( // Periksa apakah user ada (sudah login)
                <>
                 <li><Link to={`/mahasiswa`} className="text-white hover:text-gray-300">Mahasiswa</Link></li>
                 <li><Link to={`/Profile`} className="text-white hover:text-gray-300">Proifle</Link></li>
                 <li><Link to={`/login`} onClick={()=>handlelogout()} className="text-white hover:text-gray-300">Logout</Link></li>
                </>
              ) : (
                <>
                  <li><Link to={'/login'} className="text-white hover:text-gray-300">Login</Link></li>
                  <li><Link to={'/register'} className="text-white hover:text-gray-300">Register</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
