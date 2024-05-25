import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveOrder, updateOrder } from "../service/fakeService";
import { getOrder } from "../service/fakeService";
// Define an initial state
const initialState = {
    orderData: [],
    totalOrders: 0
};
let passData = {};
// Create an asynchronous thunk action
export const loadOrdersOfUser = createAsyncThunk(
    "loadOrder",
    async (userData, thunkAPI) => {
        try {
            
            const ret = await getOrder(userData);
            
            return ret;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
 
export const saveOrderApi = createAsyncThunk(
    "saveNewOrder",
    async (orderDetails, thunkAPI) => {
        try {
            let load = { items: orderDetails, isPaid: 0, isDelivered: 0, totalPrice: orderDetails[0].totalPrice, totalItems: orderDetails[0].totalItems };
            passData = { ...load };
  
            const ret = await saveOrder(load);
            return ret;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
 
export const updateOrdersByUser = createAsyncThunk(
    "updateOrder",
    async (orderDetails) => {
        try {
            const ret = await updateOrder(orderDetails);
            let pass = { ...ret, orderDetails };
            return pass;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
 
export const signOutUserOrders = () => {
    return {
        type: "order/signOut",
        payload: "",
    };
};
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        signOut(state, action) {
            state.orderData = [];
            state.totalOrders = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrdersOfUser.pending, (state) => {
                state.orderData = [];
                state.totalOrders = 0;
            })
            .addCase(loadOrdersOfUser.fulfilled, (state, action) => {

                let orders = action.payload.orders.map((order) => {
                    let items = JSON.parse(order.order_items);
                    let updatedItems = items.map((item) => {
                        return { ...item, isPaid: order.is_paid, isDelivered: order.is_delivered };
                    });
 
                    return {
                        ...order,
                        isPaid: order.is_paid,
                        isDelivered: order.is_delivered,
                        items: updatedItems,
                        totalItems: order.item_numbers
                    };
                });
 
                state.orderData = orders;
                let tot = state.orderData.reduce((count, item) => {
                    return count + (item.isPaid === 0 && item.isDelivered === 0);
                }, 0);
                state.totalOrders = tot;
            })
            .addCase(loadOrdersOfUser.rejected, (state, action) => {
                state.orderData = [];
                state.totalOrders = 0
            })
            .addCase(saveOrderApi.fulfilled, (state, action) => {
                
                if (action.payload.status == "OK") {
                    
                    let val = { ...passData, id: action.payload.id }
                    state.orderData.push(val);
                    let tot = state.orderData.reduce((count, item) => {
                        return count + (item.isPaid === 0 && item.isDelivered === 0);
                    }, 0);
                    state.totalOrders = tot;
                }
 
            })
            .addCase(updateOrdersByUser.fulfilled, (state, action) => {
                
                if (action.payload.status == "OK") {
                    
                    let index = state.orderData.findIndex(x => x.id == action.payload.orderDetails.orderID);
                    state.orderData[index].isPaid = action.payload.orderDetails.isPaid;
                    state.orderData[index].isDelivered = action.payload.orderDetails.isDelivered;
                    let tot = state.orderData.reduce((count, item) => {
                        return count + (item.isPaid === 0 && item.isDelivered === 0);
                    }, 0);
                    state.totalOrders = tot;
                }
 
            })
    },
});
export const selectOrder = (state) => state.order;
export default orderSlice.reducer;