export const EmptySet = {
    Exercise: "",
    defaultWeight: 0,
    customWeight: 0,
    defaultRepCD: 0,
    customRepCD: 0,
    defaultSetCD: 0,
    customSetCD: 0,
    defaultReps: 0,
    customReps: 0,
    defaultIncreaseStrategy: {
        increaseBy: 0,
        increaseWhen: 0
    },
    customIncreaseStrategy: {
        increaseBy: 0,
        increaseWhen: 0
    }
}

export const EmptyDay =
{
    "Number of Sets": 0,
    "Is rest day": true,
    Sets: [
        EmptySet
    ]
}

export const EmptyCycle = {
    Length: 0,
    Days: [
        EmptyDay
    ]
}

export const EmptyRoutine = {
    "Difficulty Level" : "",
    Focus: "",
    "Total Length": 0,
    "Number of Cycles": 0,
    Cycles: [
        EmptyCycle
    ]
}

export const ActuallyEmptyDay =
{
    "Number of Sets": 0,
    "Is rest day": true,
    Sets: []
}

export const ActuallyEmptyCycle = {
    Length: 0,
    Days: []
}

export const ActuallyEmptyRoutine = {
    "Difficulty Level" : "",
    Focus: "",
    "Total Length": 0,
    "Number of Cycles": 0,
    Cycles: []
}

