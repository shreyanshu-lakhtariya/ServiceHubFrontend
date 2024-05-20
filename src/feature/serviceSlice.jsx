import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const postService = createAsyncThunk(
//   "postService",
//   async (
//     { serviceName, description, price, img, id, authToken },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(price, serviceName, description, img, id, authoken);
//       const response = await axios.post(
//         `http://localhost:9000/api/serviceprovider/service/${id}`,
//         {
//           serviceName,
//           description,
//           price,
//           img,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       console.log(response);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : "Network Error"
//       );
//     }
//   }
// );

// export const postService = createAsyncThunk(
//   "postService",
//   async ({ serviceName, description, price, img }, { rejectWithValue }) => {
//     try {
//       console.log(price, serviceName, description, img);
//       const response = await axios.post(
//         `http://localhost:9000/api/serviceprovider/service/`,
//         {
//           serviceName,
//           description,
//           price,
//           img,
//         }
//       );
//       console.log(response);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : "Network Error"
//       );
//     }
//   }
// );

export const postService = createAsyncThunk(
  "postService",
  async ({ id, serviceData, authToken }) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/serviceprovider/service/${id}`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : "Network Error";
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postService.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(postService.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;