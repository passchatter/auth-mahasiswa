import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mhsServices from "./mahasiswaServices";

const MAHASISWA_URL = 'http://127.0.0.1:8000/api/list/mahasiswa/'


const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
};

export const addMahasiswa = createAsyncThunk('mahasiswa/addMahasiswa', async(addData)=>{
    try{
      const userData = localStorage.getItem('user');
      const userObject = JSON.parse(userData);
      const accessToken = userObject.access;  
      return await mhsServices.postsMahasiswa({addData, accessToken})
    }catch(error){
        return error
    }
})



export const deleteMahasiswa = createAsyncThunk('mahasiswa/deleteMahasiswa', async(id)=>{
  const userData = localStorage.getItem('user');
  const userObject = JSON.parse(userData);
  const accessToken = userObject.access; 
    try{
        return await mhsServices.deleteMahasiswa({id, accessToken})
    }catch(error){
        return error
    }
})


const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
          },
    },
    extraReducers(builder){
        builder
          .addCase(addMahasiswa.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(addMahasiswa.fulfilled, (state)=>{
            state.isSuccess = true
            state.isLoading = false
          })
          .addCase(addMahasiswa.rejected, (state)=>{
            state.isSuccess = false
            state.isLoading = false
            state.isError = true
          })
          .addCase(deleteMahasiswa.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(deleteMahasiswa.fulfilled, (state)=>{
             state.isSuccess = true
             state.isLoading = false
          })
          .addCase(deleteMahasiswa.rejected, (state)=>{
             state.isSuccess = false
             state.isLoading = false
             state.isError = true
          });
    }
})


export const {reset} = postsSlice.actions

export default postsSlice.reducer