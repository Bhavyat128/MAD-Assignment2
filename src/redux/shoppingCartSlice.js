import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartDetails, saveCart } from "../service/fakeService";
 
const initialState = {
    cartData: [],
    total: 0,
    price: 0
};
 
 
 
export const fetchsignInUserCart = createAsyncThunk(
    "fetchCart",
    async (data) => {
        try {
            const ret = await fetchCartDetails(data);
            
            return ret;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
 
export const saveUserCartDataToServer = createAsyncThunk(
    "saveUserCart",
    async (data, total) => {
        try {
 
            let load = { items: data };
            let filtered = data.filter(x => x.quantity != 0);

            const ret = await saveCart(load);
            let pass = { ...ret, filtered };

            return pass;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const clearCartOnLogout = () => {
    return {
        type: "saveCart/logout",
        payload: {},
    };
};
 
export const updateCartItemQuantity = (productId, newQuantity) => {
    return {
        type: "saveCart/updateQuantity",
        payload: { productId, newQuantity },
    };
};
 
export const deleteCartItem = (productId) => {
    return {
        type: "saveCart/removeItem",
        payload: productId,
    };
};
 
const shoppingCartSlice = createSlice({
    name: "saveCart",
    initialState,
    reducers: {
        logout(state, action) {
            state.cartData = [];
            state.total = 0;
            state.price = 0;
        },
        addItem(state, action) {
            // Efficiently check for duplicate items using `some`
            const { product, total } = action.payload;
            state.total = total;
            const productExists = state.cartData.some(
                (item) => item.id === product.id
            );
            if (!productExists) {
                state.cartData.push(product);
            } else {
                const productIndex = state.cartData.findIndex(
                    (item) => item.id === product.id
                );
                state.cartData[productIndex].quantity++;
            }
            const cost = state.cartData.reduce((total, item) => total + item.price * item.quantity, 0);
            const roundedCost = cost.toFixed(2);
            state.price = parseFloat(roundedCost);
            // state.price = cost;
        },
        updateQuantity(state, action) {
            const { productId, newQuantity } = action.payload;
            const productIndex = state.cartData.findIndex(
                (item) => item.id === productId
            );
 
            if (productIndex !== -1 && newQuantity > 0) {
                state.cartData[productIndex].quantity = newQuantity;
            } else {
                
            }
        },
        removeItem(state, action) {
            const productId = action.payload;
            const productIndex = state.cartData.findIndex(
                (item) => item.id === productId
            );
            state.cartData[productIndex].quantity--;
            state.total--;
            if (state.cartData[productIndex].quantity == 0)
                state.cartData = state.cartData.filter((item) => item.id !== productId);
            const cost = state.cartData.reduce((total, item) => total + item.price * item.quantity, 0);
            const roundedCost = cost.toFixed(2);
            state.price = parseFloat(roundedCost);
            // state.price = cost;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchsignInUserCart.pending, (state) => {
                state.cartData = [];
                state.total = 0;
                state.price = 0;
            })
            .addCase(fetchsignInUserCart.fulfilled, (state, action) => {
                if (action.payload.status == "error") {
                    state.cartData = [];
                    state.total = 0;
                    state.price = 0;
                    alert(action.payload.message);
                } else {
                    state.cartData = [];
                    state.total = 0;
                    state.price = 0;
                    
                    let filtered = action.payload.items.filter(x => x.quantity != 0);
                    state.cartData = filtered;
                    const cost = state.cartData.reduce((total, item) => total + item.price * item.quantity, 0);
                    const roundedCost = cost.toFixed(2);
                    state.price = parseFloat(roundedCost);
                    const tot = state.cartData.reduce((total, item) => total + item.quantity, 0);
                    state.total = tot;
                }
                
            })
            .addCase(fetchsignInUserCart.rejected, (state, action) => {
                state.cartData = [];
                state.total = 0;
                state.price = 0;
            })
            // addOrUpdateCart
            .addCase(saveUserCartDataToServer.fulfilled, (state, action) => {
                if (action.payload.status == "error") {
                    alert(action.payload.message);
                }
                else {
                    
                    state.cartData = action.payload.filtered;
                    const cost = state.cartData.reduce((total, item) => total + item.price * item.quantity, 0);
                    const roundedCost = cost.toFixed(2);
                    state.price = parseFloat(roundedCost);
                    const tots = state.cartData.reduce((total, item) => total + item.quantity, 0);
                    state.total = tots;
 
                }
            })
    },
});
export const selectCart = (state) => state.saveCart;
export default shoppingCartSlice.reducer;