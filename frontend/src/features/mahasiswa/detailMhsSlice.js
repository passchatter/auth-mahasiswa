import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mhsServices from "./mahasiswaServices";

const initialState = {
    mhs:[],
    status:"idle",
    error:null,
    isLoading:false,
    isSuccess:false,
    isError:false
}

export const detailMahasiswa = createAsyncThunk('mahasiswa/detailMahasiswa', async(id)=>{
    try{
      const userData = localStorage.getItem('user');
      const userObject = JSON.parse(userData);
      const accessToken = userObject.access;  
      return await mhsServices.detailMahasiswa({id, accessToken})
    }catch(error){
        return error
    }
})

export const updateMahasiswa = createAsyncThunk("mahasiswa/updateMahasiswa", async({id, data})=>{
  try{
    const userData = localStorage.getItem('user');
    const userObject = JSON.parse(userData);
    const accessToken = userObject.access;  
    return await mhsServices.update({id, data, accessToken})
  }catch(error){
    return error
  }
})


const detailMhsSlice = createSlice({
    name:'mhs',
    initialState,
    reducers:{
      reset:(state)=>{
        state.isLoading=false;
        state.isSuccess=false;
        state.isError=false;
      }
    },
    extraReducers(builder){
        builder
          .addCase(detailMahasiswa.pending, (state, action)=>{
            state.status = 'loading'
          })
          .addCase(detailMahasiswa.fulfilled, (state, action)=>{
            state.status = 'succeeded'
            state.mhs = action.payload
          })
          .addCase(detailMahasiswa.rejected, (state, action)=>{
            state.status = 'failded'
            state.error = action.error.message
          })
          .addCase(updateMahasiswa.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(updateMahasiswa.fulfilled, (state)=>{
            state.isLoading = false
            state.isSuccess = true
          })
          .addCase(updateMahasiswa.rejected, (state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
          });
    }
})


export const {reset} = detailMhsSlice.actions

export const selectAllDetail = (state)=>state.mhs.mhs
export const detailStatus = (state)=>state.mhs.status
export const detailError = (state)=>state.mhs.error

export default detailMhsSlice.reducer