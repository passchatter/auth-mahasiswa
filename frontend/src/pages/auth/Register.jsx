import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { register, reset } from '../../features/auth/authSlice';
import Spinner from '../../components/Spinner';

const Register = () => {
  const [formData, setFormData] = useState({
    "email": "",
    "username": "",
    "password": "",
    "password2": ""
  });

  const { email, username, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isLoading, isSuccess, isError, message } = useSelector((state)=>state.auth)

  const handleChange = (e) => {
    setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
          })
        )
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== password2){
       toast.error("password to not mach")
    }else{
        const userData ={
            email,
            username,
            password,
            password2
        }
        dispatch(register(userData))
    }
  }

  useEffect(()=>{
     if(isError){
        toast.error(message)
     }

     if(isSuccess){
        navigate('/login')
        toast.success("register success")
     }

     dispatch(reset())
  },[isError, isSuccess, navigate, dispatch])




  return (
    <>
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
         {isLoading && <Spinner />}
    
         <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password2" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
