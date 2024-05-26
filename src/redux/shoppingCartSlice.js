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
 
export const dataToServer = createAsyncThunk(
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
export const clearCart = () => {
    return {
        type: "saveCart/logout",
        payload: {},
    };
};
 
export const cartCount = (productId, newQuantity) => {
    return {
        type: "saveCart/addCount",
        payload: { productId, newQuantity },
    };
};
 
export const deleteCartItem = (productId) => {
    return {
        type: "saveCart/delItem",
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
            const { product, total } = action.payload;
            state.total = total;
        
            const existingProduct = state.cartData.find(item => item.id === product.id);
        
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                state.cartData.push(product);
            }
        
            state.price = state.cartData
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2);
        },

        addCount(state, action) {
            const { productId, newQuantity } = action.payload;
            const product = state.cartData.find(item => item.id === productId);
        
            if (product && newQuantity > 0) {
                product.quantity = newQuantity;
            }
        },

        delItem(state, action) {
            const productId = action.payload;
            const productIndex = state.cartData.findIndex(item => item.id === productId);
        
            if (productIndex !== -1) {
                const product = state.cartData[productIndex];
                product.quantity--;
                state.total--;
        
                if (product.quantity === 0) {
                    state.cartData = state.cartData.filter(item => item.id !== productId);
                }
        
                state.price = state.cartData
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    .toFixed(2);
            }
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
            .addCase(dataToServer.fulfilled, (state, action) => {
                if (action.payload.status == "error") {
                    alert(action.payload.message);
                }
                else {
                    
                    state.cartData = action.payload.filtered;
                    state.price = state.cartData
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    .toFixed(2);
        
                state.total = state.cartData
                    .reduce((total, item) => total + item.quantity, 0);
 
                }
            });
    },
});
export const selectCart = (state) => state.saveCart;
export default shoppingCartSlice.reducer;