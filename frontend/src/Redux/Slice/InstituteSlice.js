// src/redux/slices/instituteSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../Api/InstituteApi";

// 🔐 CREATE INSTITUTE
export const createInstitute = createAsyncThunk(
  "institute/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/create", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 🔑 LOGIN
export const loginInstitute = createAsyncThunk(
  "institute/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/login", data);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addInstructor = createAsyncThunk(
  "institute/addInstructor",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/addInstructor", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addCourse = createAsyncThunk(
  "institute/addCourse",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/addCourse", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addModule = createAsyncThunk(
  "institute/addModule",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/addModule", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addLecture = createAsyncThunk(
    "institute/addLecture",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/addLecture", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addQuiz= createAsyncThunk(
    "institute/addQuiz",
    async (data, { rejectWithValue }) => {
        try {
        const res = await axios.post("/addQuiz", data);
        return res.data;
        } catch (err) {
        return rejectWithValue(err.response.data);
        }
    }
)
export const addQuestion= createAsyncThunk(
    "institute/addQuestion",
    async (data, { rejectWithValue }) => {
        try {
        const res = await axios.post("/addQuestion", data);
        return res.data;
        } catch (err) {
        return rejectWithValue(err.response.data);
        }
    }
)
// AddInstructor, AddCourse, AddModule etc can be added similarly...

const instituteSlice = createSlice({
  name: "institute",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutInstitute: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInstitute.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInstitute.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(createInstitute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      .addCase(loginInstitute.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginInstitute.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.user = action.payload.Insitute;
        localStorage.setItem("user", JSON.stringify(action.payload.Insitute));
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginInstitute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(addInstructor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInstructor.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addInstructor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add instructor";
      });
  },
});

export const { logoutInstitute } = instituteSlice.actions;
export default instituteSlice.reducer;
