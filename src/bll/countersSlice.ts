import AsyncStorage from "@react-native-async-storage/async-storage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v1 } from "uuid"

import type { CounterType, CountersSliceType } from "./allTypes"

// thunks
export const fetchCountersThunk = createAsyncThunk("GET", async () => {
    return await AsyncStorage.getItem("@COUNTERS")
})

export const incrementThunk = createAsyncThunk("INCREMENT", (id: string) => {
    return id
})

export const decrementThunk = createAsyncThunk("DECREMENT", (id: string) => {
    return id
})

export const changeCompleteThunk = createAsyncThunk("CHANGE_STATUS", ({ id, value }: any) => {
    return { id, value }
})

export const changeTargetTitleThunk = createAsyncThunk("CHANGE_TARGET_TITLE", ({ id, value }: any) => {
    return { id, value }
})

export const changeTargetNumberThunk = createAsyncThunk("CHANGE_TARGET_NUMBER", ({ id, value }: any) => {
    return { id, value }
})

export const addNewCounterThunk = createAsyncThunk("ADD_NEW_COUNTER", () => {
    return null
})

export const deleteCounterThunk = createAsyncThunk("DELETE_COUNTER", (id: string) => {
    return id
})

// state
const initialState: CountersSliceType = []

// reducers
export const countersSlice = createSlice({
    name: "Counters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(fetchCountersThunk.fulfilled, (state, action) => {
                return JSON.parse(action.payload)
            })

            // INCREMENT
            .addCase(incrementThunk.fulfilled, (state, action) => {
                const result = state.map((c) => (c.id === action.payload ? { ...c, count: c.count + 1 } : c))
                AsyncStorage.setItem("@COUNTERS", JSON.stringify(result))
                return result
            })

            // DECREMENT
            .addCase(decrementThunk.fulfilled, (state, action) => {
                const result = state.map((c) => (c.id === action.payload ? { ...c, count: c.count - 1 } : c))
                AsyncStorage.setItem("@COUNTERS", JSON.stringify(result))
                return result
            })

            // CHANGE STATUS
            .addCase(changeCompleteThunk.fulfilled, (state, action) => {
                const result = state.map((c) =>
                    c.id === action.payload.id ? { ...c, completed: action.payload.value } : c
                )
                AsyncStorage.setItem("@COUNTERS", JSON.stringify(result))
                return result
            })

            // CHANGE TARGET TITLE
            .addCase(changeTargetTitleThunk.fulfilled, (state, action) => {
                const result = state.map((c) =>
                    c.id === action.payload.id
                        ? {
                              ...c,
                              titleTarget: action.payload.value,
                          }
                        : c
                )
                AsyncStorage.setItem("@COUNTERS", JSON.stringify(result))
                return result
            })

            // CHANGE TARGET NUMBER
            .addCase(changeTargetNumberThunk.fulfilled, (state, action) => {
                const result = state.map((c) =>
                    c.id === action.payload.id
                        ? {
                              ...c,
                              targetNumber: action.payload.value,
                          }
                        : c
                )
                AsyncStorage.setItem("@COUNTERS", JSON.stringify(result))
                return result
            })

            // ADD NEW COUNTER
            .addCase(addNewCounterThunk.fulfilled, (state) => {
                const newCounter: CounterType = {
                    id: v1(),
                    titleTarget: null,
                    targetNumber: 10,
                    count: 0,
                    completed: false,
                }
                const result: Array<CounterType> = [...state, newCounter]
                AsyncStorage.setItem("@COUNTERS", JSON.stringify(result))
                return result
            })

            // DELETE COUNTER

            .addCase(deleteCounterThunk.fulfilled, (state, action) => {
                const result = state.filter((c) => c.id !== action.payload)
                AsyncStorage.setItem("@COUNTERS", JSON.stringify(result))
                return result
            })
    },
})

export default countersSlice.reducer
