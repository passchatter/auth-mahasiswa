import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mhsServices from "./mahasiswaServices";

const initialState = {
    mahasiswa:[],
    status:'idle',
    error:null
}

export const fetchMahasiswa = createAsyncThunk("mahasiswa/fetchMahasiswa", async()=>{
    try{
      const userData = localStorage.getItem('user');
      const userObject = JSON.parse(userData);
      const accessToken = userObject.access;  
      return await mhsServices.listMahasiswa(accessToken)
    }catch(error){
        return error.message
    }
})


const mahasiswaSlice = createSlice({
    name:'mahasiswa',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
          .addCase(fetchMahasiswa.pending, (state, action)=>{
            state.status = 'loading'
          })
          .addCase(fetchMahasiswa.fulfilled, (state, action)=>{
            state.status = 'succeeded'
            state.mahasiswa = action.payload
          })
          .addCase(fetchMahasiswa.rejected, (state, action)=>{
            state.status = "failded"
            state.error = action.error.message
          })
    }

})


export const selectAllMahasiswa = (state)=>state.mahasiswa.mahasiswa
export const selectAllStatus = (state)=>state.mahasiswa.status
export const selectAllError = (state)=>state.mahasiswa.error

export default mahasiswaSlice.reducer