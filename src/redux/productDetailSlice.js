import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductDetailsByID } from "../service/apiService";
// Define an initial state
const initialState = {
    productDetailbody: {},
    rating: {},
    loading: false,
    error: null,
};
// Create an asynchronous thunk action
export const loadproductDetailbody = createAsyncThunk(
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
            .addCase(loadproductDetailbody.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadproductDetailbody.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.productDetailbody = action.payload;
                let rate = state.productDetailbody;
               
                state.rating = rate.rating;
            })
            .addCase(loadproductDetailbody.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.productDetailbody = {};
                state.rating = {};
            });
    },
});
export const selectProductDetail = (state) => state.productDetail;
export default productDetailSlice.reducer;