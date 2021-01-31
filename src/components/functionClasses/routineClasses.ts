export class CincreaseStrategy{
    increaseBy: number = 0;
    increaseWhen: number = 0
    copy(){
        return {...this}
    }
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
    copy(){
        return {...this, 
            defaultIncreaseStrategy: this.defaultIncreaseStrategy.copy(),
            customIncreaseStrategy: this.customIncreaseStrategy.copy()
        }
    }
}
export class CRoutineDay{
    "Number of Sets": number = 0;
    "Is rest day": boolean = false;
    "Sets": Array<CRoutineSet> = [new CRoutineSet()]
    copy(){
        const newSets: Array<CRoutineSet> =[]
        this.Sets.forEach(set=>{
            newSets.push(set.copy())
        })
        return {...this,
            Sets: newSets
        }
    }
}
export class CRoutineCycle{
    "Length": number = 0;
    "Days": Array<CRoutineDay> = [new CRoutineDay()]
    copy(){
        const newDays: Array<CRoutineDay> =[]
        this.Days.forEach(set=>{
            newDays.push(set.copy())
        })
        return {...this,
            Sets: newDays
        }
    }
}
export class CRoutine{
    "Difficulty Level": string = '';
    "Focus": string = '';
    "Total Length": number = 0;
    "Number of Cycles": number = 0;
    "Cycles": Array<CRoutineCycle> = [new CRoutineCycle()]
    copy(){
        const newCycles: Array<CRoutineCycle> =[]
        this.Cycles.forEach(set=>{
            newCycles.push(set.copy())
        })
        return {...this,
            Sets: newCycles
        }
    }
}

