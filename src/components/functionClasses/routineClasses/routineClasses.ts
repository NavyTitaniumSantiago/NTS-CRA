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
    defaultSetCD: number = 0;
    customSetCD: number = 0;
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
            this.defaultSetCD = values.defaultSetCD
            this.customSetCD = values.customSetCD
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
    //protected length: number = 0
    replace (idx: number, objectIn: CRoutineSet | CRoutineDay | CRoutineCycle){
        if(idx>=this.iterable.length){
            this.iterable.push(objectIn.copy())
        }
        else{
            this.iterable[idx] = objectIn.copy()
        }
    }

    insert (idx: number, objectIn: CRoutineSet | CRoutineDay | CRoutineCycle){
        if(idx>=this.iterable.length) this.iterable.push(objectIn.copy())
        else{
            this.iterable.splice(idx, 0, objectIn.copy())
        }
       // this.length++
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

    move(idxMoved: number, idxMovedTo: number): number{
        if(Math.max(idxMoved, idxMovedTo)>=this.iterable.length) return 0
        else{
            const temp = this.iterable[idxMoved]
            if(Math.abs(idxMoved-idxMovedTo)===1){
                this.iterable[idxMoved] = this.iterable[idxMovedTo]
                this.iterable[idxMovedTo] = temp
            }
            else{
                this.insert(idxMovedTo, temp)
                if(idxMovedTo<idxMoved) this.remove(idxMoved+1)
                else this.remove(idxMoved)
            }
            return 0
        }
    }
    
    copy () : any {
        const iterableCopy: Array<CRoutineSet | CRoutineDay | CRoutineCycle > =[]
        this.iterable.forEach(item=>{
            iterableCopy.push(item.copy())
        })
        return {...this,
            iterable: iterableCopy
        }
    }
}

export class CRoutineDay extends RoutineCommonFunctions{
    "Number of Sets": number = 0;
    "Is rest day": boolean = true;
    "Sets": Array<CRoutineSet> = [new CRoutineSet()]
    constructor(values?: CRoutineDay){
        super()
        if(values){
            this["Number of Sets"] = values["Number of Sets"]
            this["Is rest day"] = values["Is rest day"]
            this["Sets"] = []
            if(values.Sets){ //If a rest day is instantiated it will have no Sets attached.
                for(let i = 0; i< values["Sets"].length; i++){
                    this["Sets"].push(new CRoutineSet(values["Sets"][i])) //the inputs will mostly be JSONs
                }
            }
        }
        this.iterable = this.Sets
        //this.length = this.iterable.length
    }
}
export class CRoutineCycle extends RoutineCommonFunctions{
    "Length": number = 0
    "Days": Array<CRoutineDay> = [new CRoutineDay()]
    constructor(values?: CRoutineCycle){
        super()
        if(values){
            this.Length = values.Length
            this.Days = []
            if(values.Days){
                for(let i = 0; i< values.Days.length; i++){
                    this.Days.push(new CRoutineDay(values.Days[i]))
                }
            }
        }
        this.iterable = this.Days
        //this.length = this.iterable.length
    }
}
export class CRoutine extends RoutineCommonFunctions{
    "Difficulty Level": string = '';
    "Focus": string = '';
    "Total Length": number = 0; // this really needs to be cleaned up we're not using a lot of it
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
            if(values.Cycles){
                for(let i = 0; i< values["Cycles"].length; i++){
                    this["Cycles"].push(new CRoutineCycle(values["Cycles"][i]))
                }
            }
        }
        this.iterable = this.Cycles
       // this.length = this.iterable.length
        //this["Number of Cycles"] = this.length
    }
}

