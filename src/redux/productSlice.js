import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../service/apiService";
// Define an initial state
const initialState = {
    productbody: {},
    loading: false,
    error: null,
};
// Create an asynchronous thunk action
export const loadProductData = createAsyncThunk(
    "loadProduct",
    async (categoryId, thunkAPI) => {
        try {
            const ret = await fetchProducts(categoryId);
            
            return ret;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
 
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProductData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadProductData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.productData = action.payload;
            })
            .addCase(loadProductData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.productData = {};
            });
    },
});
export const selectProduct = (state) => state.product;
export default productSlice.reducer;