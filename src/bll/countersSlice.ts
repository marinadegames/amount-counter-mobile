import AsyncStorage from "@react-native-async-storage/async-storage"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v1 } from "uuid"

import type {
    ChangeCompleteType,
    ChangeTargetNumberType,
    ChangeTargetTitleType,
    CountersSliceType,
    IncrementActionType,
} from "./allTypes"
import { useAppDispatch } from "./store"

// thunks
export const getStoreThunk = createAsyncThunk("counters", async () => {
    try {
        const result = await AsyncStorage.getItem("@COUNTERS")
        return JSON.parse(result)
    } catch (error) {
        console.log(error)
    }
})

export const updateStoreThunk = createAsyncThunk("counters", async () => {
    try {
        await AsyncStorage.setItem("@COUNTERS", JSON.stringify(initialState))
    } catch (e) {
        console.log(e)
    }
})

// state
const initialState: CountersSliceType = [
    {
        id: v1(),
        count: 8,
        targetNumber: 10,
        titleTarget: "ten",
        completed: false,
    },
]

// reducers
export const countersSlice = createSlice({
    name: "Counters",
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<IncrementActionType>) => {
            return state.map((c) => (c.id === action.payload.id ? { ...c, count: c.count + 1 } : c))
        },
        decrement: (state, action: PayloadAction<IncrementActionType>) => {
            return state.map((c) => (c.id === action.payload.id ? { ...c, count: c.count - 1 } : c))
        },
        changeComplete: (state, action: PayloadAction<ChangeCompleteType>) => {
            return state.map((c) =>
                c.id === action.payload.id ? { ...c, completed: action.payload.completed } : c
            )
        },
        changeTargetTitle: (state, action: PayloadAction<ChangeTargetTitleType>) => {
            return state.map((c) =>
                c.id === action.payload.id ? { ...c, titleTarget: action.payload.value } : c
            )
        },
        changeTargetNumber: (state, action: PayloadAction<ChangeTargetNumberType>) => {
            return state.map((c) =>
                c.id === action.payload.id ? { ...c, targetNumber: action.payload.value } : c
            )
        },
        addNewCounter: (state) => {
            state.unshift({
                id: v1(),
                titleTarget: null,
                targetNumber: 10,
                count: 0,
                completed: false,
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getStoreThunk.fulfilled, (state, action: any) => {
            return action.payload
        })
    },
})

export const {
    increment,
    decrement,
    changeComplete,
    changeTargetTitle,
    changeTargetNumber,
    addNewCounter,
} = countersSlice.actions
export default countersSlice.reducer
