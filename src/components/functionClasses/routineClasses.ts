export class CincreaseStrategy{
    increaseBy: number = 0;
    increaseWhen: number = 0
}
export class CRoutineSet{
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
export class CRoutineDay{
    "Number of Sets": number = 0;
    "Is rest day": boolean = false;
    "Sets": Array<CRoutineSet> = [new CRoutineSet()]
}
export class CRoutineCycle{
    "Length": number = 0;
    "Days": Array<CRoutineDay> = [new CRoutineDay()]
}
export class CRoutine{
    "Difficulty Level": string = '';
    "Focus": string = '';
    "Total Length": number = 0;
    "Number of Cycles": number = 0;
    "Cycles": Array<CRoutineCycle> = [new CRoutineCycle()]
}

