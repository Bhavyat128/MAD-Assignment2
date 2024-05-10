import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductDetailsByID } from "../service/apiService";
// Define an initial state
const initialState = {
    productDetailData: {},
    rating: {},
    loading: false,
    error: null,
};
// Create an asynchronous thunk action
export const loadProductDetailData = createAsyncThunk(
    "loadProductDetail",
    async (productId, thunkAPI) => {
        try {
            const ret = await fetchProductDetailsByID(productId);
            return ret;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
 
const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProductDetailData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadProductDetailData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.productDetailData = action.payload;
                let rate = state.productDetailData;
                console.log("printttt", rate.rating);
                state.rating = rate.rating;
            })
            .addCase(loadProductDetailData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.productDetailData = {};
                state.rating = {};
            });
    },
});
export const selectProductDetail = (state) => state.productDetail;
export default productDetailSlice.reducer;