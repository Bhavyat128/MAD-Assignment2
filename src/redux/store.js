import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import productDetailReducer from "./productDetailSlice"

import shoppingCartReducer from "./shoppingCartSlice"
export const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        productDetail: productDetailReducer,
        shoppingCart: shoppingCartReducer
    }
});
 
export default store;