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

// thunks
export const fetchCountersThunk = createAsyncThunk("GET", async () => {
    return await AsyncStorage.getItem("@COUNTERS")
})

export const incrementThunk = createAsyncThunk("INCREMENT", async (id: string) => {
    return id
})

// state
const initialState: CountersSliceType = []

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
                c.id === action.payload.id
                    ? {
                          ...c,
                          completed: action.payload.completed,
                      }
                    : c
            )
        },
        changeTargetTitle: (state, action: PayloadAction<ChangeTargetTitleType>) => {
            return state.map((c) =>
                c.id === action.payload.id
                    ? {
                          ...c,
                          titleTarget: action.payload.value,
                      }
                    : c
            )
        },
        changeTargetNumber: (state, action: PayloadAction<ChangeTargetNumberType>) => {
            return state.map((c) =>
                c.id === action.payload.id
                    ? {
                          ...c,
                          targetNumber: action.payload.value,
                      }
                    : c
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
        updateStore: (state: CountersSliceType, action: PayloadAction<CountersSliceType>) => {
            return [...state, ...action.payload]
        },
    },
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(fetchCountersThunk.pending, (state, action) => {
                console.log(action.payload)
            })
            .addCase(fetchCountersThunk.fulfilled, (state, action) => {
                console.log(JSON.parse(action.payload))
                return JSON.parse(action.payload)
            })
            .addCase(fetchCountersThunk.rejected, () => {
                console.error("ERROR: GET")
            })

            // INCREMENT
            .addCase(incrementThunk.fulfilled, (state, action) => {
                const result = state.map((c) => (c.id === action.payload ? { ...c, count: c.count + 1 } : c))
                AsyncStorage.setItem("@COUNTERS", JSON.stringify(result))
                return result
            })
    },
})

export const {
    updateStore,
    increment,
    decrement,
    changeComplete,
    changeTargetTitle,
    changeTargetNumber,
    addNewCounter,
} = countersSlice.actions
export default countersSlice.reducer
