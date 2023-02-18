
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos : [],
    isLoading: false,
    error: null,
    isError: false,
}

export const __getTodos = createAsyncThunk(
    'getTodos',
    async (payload, thunkAPI) => {
        try { 
        
        const response = await axios.get('http://localhost:4000/todos') 
        console.log('response' , response.data)
        // fulfillWithValue가 어디로 dispatch하는가 : extraReducers
        return thunkAPI.fulfillWithValue(response.data);

        } catch (error) {
            console.log('error', error)
        return thunkAPI.rejectWithValue(error);
        }
        
    }

)

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: {
        [__getTodos.pending]: (state, action) => {
            state.isLoading = true;
            state.isError = false;
        },
        [__getTodos.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.todos = action.payload
        }, 
        [__getTodos.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload
        },
        

    }
});

export const {} = todosSlice.actions
export default todosSlice.reducer