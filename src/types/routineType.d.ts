declare const CincreaseStrategy:{
    increaseBy: number = 0;
    increaseWhen: number = 0
}
declare const CRoutineSet:{
    Exercise: string = '';
    defaultWeight: number = 0;
    customWeight: number = 0;
    defaultRepCD: number = 0;
    customRepCD: number = 0;
    defaultReps: number = 0;
    customReps: number = 0;
    defaultIncreaseStrategy: CincreaseStrategy = new CincreaseStrategy();
    customIncreaseStrategy: CincreaseStrategy = new CincreaseStrategy()
}
declare const CRoutineDay:{
    "Number of Sets": number = 0;
    "Is rest day": boolean = false;
    "Sets": Array<CRoutineSet> = [new CRoutineSet()]
}
declare const CRoutineCycle:{
    "Length": number = 0;
    "Days": Array<CRoutineDay> = [new CRoutineDay()]
}
declare const CRoutine:{
    "Difficulty Level": string = '';
    "Focus": string = '';
    "Total Length": number = 0;
    "Number of Cycles": number = 0;
    "Cycles": Array<CRoutineCycle> = [new CRoutineCycle()]
}

