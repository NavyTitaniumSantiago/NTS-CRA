export interface IincreaseStrategy{
    increaseBy: number,
    increaseWhen: number
}
export interface IRoutineSet{
    Exercise: string,
    defaultWeight: number,
    customWeight: number,
    defaultRepCD: number,
    customRepCD: number,
    defaultReps: number,
    customReps: number,
    defaultIncreaseStrategy: IincreaseStrategy,
    customIncreaseStrategy: IincreaseStrategy
}
export interface IRoutineDay{
    "Number of Sets": number,
    "Is rest day": boolean,
    "Sets": Array<IRoutineSet>
}
export interface IRoutineCycle{
    "Length": number,
    "Days": Array<IRoutineDay>
}
export interface IRoutine{
    "Difficulty Level": string,
    "Focus": string,
    "Total Length": number,
    "Number of Cycles": number,
    "Cycles": Array<IRoutineCycle>
}