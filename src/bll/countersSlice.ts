import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type CountersSliceType = Array<CounterType>

export type CounterType = {
    id: number
    titleTarget: string
    count: number
    targetNumber: number
    completed: boolean
}

export type IncrementActionType = {
    id: number
}

export type ChangeCompleteType = {
    id: number
    completed: boolean
}

export type ChangeTargetTitleType = {
    id: number
    value: string
}

export type ChangeTargetNumberType = {
    id: number
    value: number
}

const initialState: CountersSliceType = [
    {
        id: 1,
        count: 0,
        targetNumber: 10,
        titleTarget: "ten",
        completed: false,
    },
    {
        id: 2,
        count: 0,
        targetNumber: 1000,
        titleTarget: "iPhone",
        completed: false,
    },
    {
        id: 3,
        count: 0,
        targetNumber: 3000,
        titleTarget: "Mac",
        completed: false,
    },
]

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
    },
})

export const { increment, decrement, changeComplete, changeTargetTitle, changeTargetNumber } =
    countersSlice.actions
export default countersSlice.reducer
