import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authServices";


// Inisialisasi state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isError: false,
  userInfo: {},
  isSuccess: false,
  isLoading: false,
  message: "",
  isAuthenticated: false,
};

// Action creator untuk mendaftar
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    return await authServices.register(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Action creator untuk login
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authServices.login(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Action creator untuk mendapatkan informasi user
export const getUserInfo = createAsyncThunk("auth/getUserInfo", async (_, thunkAPI) => {
  try {
    const userData = localStorage.getItem('user');
    const userObject = JSON.parse(userData);
    const accessToken = userObject.access;

    return await authServices.getUserInfo(accessToken);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});



// Action creator untuk logout
export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
      authServices.logout()
  }
)

// Slice untuk manajemen state auth
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    isLoginSuccess: (state, action) =>{
       state.isAuthenticated = true
    },
    isLogoutSuccess: (state, action) => {
      state.isAuthenticated = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Registrasi gagal";
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Login gagal";
        state.user = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
      
  },
});

export const { reset, saveUserInfo, isLoginSuccess, isLogoutSuccess } = authSlice.actions;

export default authSlice.reducer;
