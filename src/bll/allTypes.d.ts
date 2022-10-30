export type CountersSliceType = Array<CounterType>

export type CounterType = {
    id: string
    titleTarget: string
    count: number
    targetNumber: number
    completed: boolean
}

export type IncrementActionType = {
    id: string
}

export type ChangeCompleteType = {
    id: string
    completed: boolean
}

export type ChangeTargetTitleType = {
    id: string
    value: string
}

export type ChangeTargetNumberType = {
    id: string
    value: number
}
