import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp, updateSignin } from "../service/fakeService";
 
const initialState = {
    logData: {},
    token: ''
};
 
export const signInUser = createAsyncThunk(
    "signIn",
    async (userDetails) => {
        try {
            const ret = await signIn(userDetails);
            
            return ret;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
 
export const signUpUser = createAsyncThunk(
    "signUp",
    async (userDetails) => {
        try {
            const ret = await signUp(userDetails);
    
            return ret;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
 
export const signOutUser = () => {
    return {
        type: "logUser/signOut",
        payload: "",
    };
};
 
export const updateUser = createAsyncThunk(
    "update",
    async (userDetails, token) => {
        try {
            
            const ret = await updateSignin(userDetails);
            
            return ret;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
 
 
const logUserSlice = createSlice({
    name: "logUser",
    initialState,
    reducers: {
        signOut(state, action) {
            state.logData = {};
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInUser.pending, (state) => {
                state.logData = {};
                state.token = "";
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                if (action.payload.status == "error") {
                    state.logData = {};
                    state.token = "";
                    alert(action.payload.message);
                } else {
                    state.logData = action.payload;
                    state.token = state.logData.token;
                }
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.logData = {};
                state.token = "";
            })
            .addCase(signUpUser.pending, (state) => {
                state.logData = {};
                state.token = "";
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                if (action.payload.status == "error") {
                    state.logData = {};
                    state.token = "";
                    alert(action.payload.message);
                } else {
                    state.logData = action.payload;
                    state.token = state.logData.token;
                }
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.logData = {};
                state.token = "";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                if (action.payload.status == "error") {
                    alert(action.payload.message);
                } else {
                    state.logData.name = action.payload.name;
                }
            })
    },
});
export const logDelail = (state) => state.logUser;
export default logUserSlice.reducer;