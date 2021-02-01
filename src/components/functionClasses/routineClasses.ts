import  {IincreaseStrategy, IRoutineSet, IRoutineDay, IRoutineCycle, IRoutine} from './interfacesFunctionClasses'


export class CincreaseStrategy{ 
    increaseWhen: number = 0
    increaseBy: number = 0;
    constructor(values?: CincreaseStrategy ){
        if(values){
            this.increaseBy = values.increaseBy
            this.increaseWhen = values.increaseWhen
        }
    }
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
    constructor(values?: CRoutineSet){
        if(values){
            this.Exercise = values.Exercise
            this.defaultWeight = values.defaultWeight
            this.customWeight = values.customWeight
            this.defaultRepCD = values.defaultRepCD
            this.customRepCD = values.customRepCD
            this.defaultReps = values.defaultReps
            this.customReps = values.customReps
            this.defaultIncreaseStrategy = new CincreaseStrategy(values.defaultIncreaseStrategy)
            this.customIncreaseStrategy = new CincreaseStrategy(values.customIncreaseStrategy)
        }
    }
    copy(){
        return {...this, 
            defaultIncreaseStrategy: this.defaultIncreaseStrategy.copy(),
            customIncreaseStrategy: this.customIncreaseStrategy.copy()
        }
    }
}
class RoutineCommonFunctions{
    protected iterable: Array<CRoutineSet|CRoutineDay|CRoutineCycle> = []
    
    replace (idx: number, arrayIn: CRoutineSet | CRoutineDay | CRoutineCycle){
        if(idx>=this.iterable.length){
            this.iterable.push(arrayIn.copy())
        }
        else{
            this.iterable[idx] = arrayIn.copy()
        }
    }

    insert (idx: number, arrayIn: CRoutineSet | CRoutineDay | CRoutineCycle){
        if(idx>=this.iterable.length) this.iterable.push(arrayIn.copy())
        else{
            this.iterable.splice(idx, 0, arrayIn.copy())
        }
    }

    remove (idx: number): number{
        if(idx>=this.iterable.length) return 0
        else{
            this.iterable.splice(idx, 1)
            return 1
        }
    }

    duplicate(idx: number): number{
        if(idx>=this.iterable.length) return 0
        else{
            this.iterable.splice(idx, 0, this.iterable[idx].copy())
            return 1
        }
    }
    swap(idxMoved: number, idxMovedTo: number): number{
        if(Math.max(idxMoved, idxMovedTo)>=this.iterable.length) return 0
        else{
            const temp = this.iterable[idxMoved]
            if(Math.abs(idxMoved-idxMovedTo)===1){
                this.iterable[idxMoved] = this.iterable[idxMovedTo]
                this.iterable[idxMovedTo] = temp
            }
            else{
                this.insert(idxMovedTo, this.iterable[idxMoved])
            }
            return 0
        }
    }
}
export class CRoutineDay extends RoutineCommonFunctions{
    "Number of Sets": number = 0;
    "Is rest day": boolean = false;
    "Sets": Array<CRoutineSet> = [new CRoutineSet()]
    constructor(values?: CRoutineDay){
        super()
        if(values){
            this["Number of Sets"] = values["Number of Sets"]
            this["Is rest day"] = values["Is rest day"]
            this["Sets"] = []
            for(let i = 0; i< values["Sets"].length; i++){
                this["Sets"].push(values["Sets"][i].copy())
            }
        }
        this.iterable = this.Sets
    }

    copy () : CRoutineDay{
        const newSets: Array<CRoutineSet> =[]
        this.Sets.forEach(set=>{
            newSets.push(set.copy())
        })
        return {...this,
            Sets: newSets
        }
    }
}
export class CRoutineCycle extends RoutineCommonFunctions{
    "Length": number = 0;
    "Days": Array<CRoutineDay> = [new CRoutineDay()]
    constructor(values?: CRoutineCycle){
        super()
        if(values){
            this.Length = values.Length
            this.Days = []
            for(let i = 0; i< values.Days.length; i++){
                this.Days.push(values.Days[i].copy())
            }
        }
        this.iterable = this.Days
    }
    copy(){
        const newDays: Array<CRoutineDay> =[]
        this.Days.forEach(day=>{
            newDays.push(day.copy())
        })
        return {...this,
            Sets: newDays
        }
    }
}
export class CRoutine extends RoutineCommonFunctions{
    "Difficulty Level": string = '';
    "Focus": string = '';
    "Total Length": number = 0;
    "Number of Cycles": number = 0;
    "Cycles": Array<CRoutineCycle> = [new CRoutineCycle()]
    constructor(values?: CRoutine){
        super()
        if(values){
            this["Difficulty Level"] = values["Difficulty Level"]
            this["Focus"] = values["Focus"]
            this["Total Length"] = values["Total Length"]
            this["Number of Cycles"] = values["Number of Cycles"]
            this["Cycles"] = []
            for(let i = 0; i< values["Cycles"].length; i++){
                this["Cycles"].push(values["Cycles"][i].copy())
            }
        }
        this.iterable = this.Cycles
    }
    copy(){
        const newCycles: Array<CRoutineCycle> =[]
        this.Cycles.forEach(cycle=>{
            newCycles.push(cycle.copy())
        })
        return {...this,
            Sets: newCycles
        }
    }
}

