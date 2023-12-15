import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import mahasiswaReducer from '../features/mahasiswa/mahasiswaSlice'
import mhsReducer from '../features/mahasiswa/detailMhsSlice'
import postsReducer from '../features/mahasiswa/postsSlice'

export const store = configureStore({
    reducer:{
      auth:authReducer,
      mahasiswa:mahasiswaReducer,
      mhs:mhsReducer,
      posts:postsReducer
    }
})