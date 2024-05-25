import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategory } from "../service/apiService";

const initialState = {
    categorybody: {},
    loading: false,
    error: null,
};
// Create an asynchronous thunk action
export const loadCategoryData = createAsyncThunk(
    "loadCategory",
    async (thunkAPI) => {
        try {
            const ret = await fetchCategory();
           
            return ret;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
 
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCategoryData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadCategoryData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.categoryData = action.payload;
            })
            .addCase(loadCategoryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.categoryData = {};
            });
    },
});
export const selectCategory = (state) => state.category;
export default categorySlice.reducer;