import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import productDetailReducer from "./productDetailSlice";
import orderReducer from './orderSlice';
import shoppingCartReducer from "./shoppingCartSlice";
import saveCartReducer from "./shoppingCartSlice";
import logUserReducer from "./logUserSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        productDetail: productDetailReducer,
        shoppingCart: shoppingCartReducer,
        order:orderReducer,
        saveCart:saveCartReducer,
        logUser:logUserReducer,
    }
});
 
export default store;