import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartData: [],
    sum: 0,
    price: 0
};
export const addCartData = (product, sum) => {
    return {
        type: "shoppingCart/addProduct",
        payload: { product, sum },
    };
};

export const deleteCartData = (productId) => {
    return {
        type: "shoppingCart/cancelProduct",
        payload: productId,
    };
};

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        addProduct(state, action) {

            const { product, sum } = action.payload;
            state.sum = sum;
            const products = state.cartData.find(
                (x) => x.id === product.id
            );
            if (!products) {
                state.cartData.push(product);
            } else {
                const productIndex = state.cartData.findIndex(
                    (x) => x.id === product.id
                );
                state.cartData[productIndex].quantity+=1;
            }

            state.price = parseFloat(state.cartData.reduce((sum, x) => sum + x.price * x.quantity, 0).toFixed(2));

        },
        cancelProduct(state, action) {
            const productId = action.payload;
            const productIndex = state.cartData.findIndex(
                (x) => x.id === productId
            );
            state.cartData[productIndex].quantity-=1;
            state.sum-=1;
            if (state.cartData[productIndex].quantity == 0)
                state.cartData = state.cartData.filter((x) => x.id !== productId);
            state.price = parseFloat(state.cartData.reduce((sum, x) => sum + x.price * x.quantity, 0).toFixed(2));

        },
    },
});
export const selectCart = (state) => state.shoppingCart;
export default shoppingCartSlice.reducer;