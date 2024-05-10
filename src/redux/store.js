import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import productDetailReducer from "./productDetailSlice"
export const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        productDetail: productDetailReducer
 
    }
});
 
export default store;