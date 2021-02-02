import {EmptySet, EmptyDay, EmptyCycle, EmptyRoutine, 
    ActuallyEmptyDay, ActuallyEmptyCycle, ActuallyEmptyRoutine} from './routineClassesTestData'
import {CincreaseStrategy, CRoutineSet, CRoutineDay, CRoutineCycle, CRoutine} from './routineClasses'
import {Ceonxiy, CycleLenOne, RoutineLenOne} from './rCtestRoutineData.js'
const TestRoutine = Ceonxiy

const TestIncStrat = TestRoutine.Cycles[0].Days[0].Sets[0].defaultIncreaseStrategy
const TestSet = TestRoutine.Cycles[0].Days[0].Sets[0]
const TestDay = TestRoutine.Cycles[1].Days[0]
const TestCycle = TestRoutine.Cycles[0]

export function incStratDefault(objIn, valOne, valTwo){
    expect(objIn.increaseBy).toEqual(valOne)
    expect(objIn.increaseWhen).toEqual(valTwo)
}

export function incStratCopy(objIn, valOne, valTwo){
        const CincStratCopy = objIn.copy()
        const updTwo = valTwo+1
        expect(CincStratCopy.increaseBy).toEqual(valOne)
        expect(CincStratCopy.increaseWhen).toEqual(valTwo)
        objIn.increaseWhen = updTwo
        expect(objIn.increaseWhen).toEqual(updTwo)
        expect(CincStratCopy.increaseWhen).toEqual(valTwo)
}

export function testDefault(classIn, testObj){
    //console.log(testObj)
    const Ctest = new classIn()
    expect(Ctest).not.toBeNull()
    expect(Ctest).toMatchObject(testObj)

}
export function testCustom(classIn, testObj){
    const Ctest = new classIn(testObj)
    expect(Ctest).not.toBeNull()
    expect(Ctest).toMatchObject(testObj)
}

export function testCopy(classIn, testObj, whatToChange){
    const Ctest = new classIn(testObj)
    expect(Ctest).not.toBeNull()
    const CtestCopy = Ctest.copy()
    expect(CtestCopy[whatToChange]).toEqual(Ctest[whatToChange])
    CtestCopy[whatToChange] = 1337
    expect(CtestCopy[whatToChange]).toEqual(1337)
    expect(Ctest[whatToChange]).toEqual(Ctest[whatToChange])
}

export function checkParentFunctionsExist(classIn){
    const funcArray = ['replace', 'insert', 'remove', 'duplicate', 'swap']
    for(let i = 0; i<funcArray.length; i++){
        expect(typeof classIn[funcArray[i]]).toEqual('function')
    }
}

export function standaloneRCFreplace (arrIn, idx, valIn){
    if(idx>=arrIn.length){
        arrIn.push(valIn)
    }
    else{
        arrIn[idx] = valIn
    }
    return arrIn
}

export function testReplace(testTarget, idx){
    let key, nonemptyJSON, CRoutineInstance, emptyJSON, conversion, sanityCheck
    switch(testTarget){
        case "Day":
            key = "Sets"
            nonemptyJSON = TestDay
            CRoutineInstance = new CRoutineDay(TestDay)
            emptyJSON = EmptyDay
            conversion = CRoutineSet
            sanityCheck = ["defaultRepCD", 40, 0]
            break;
        case "Cycle":
            key = "Days"
            nonemptyJSON = TestCycle
            CRoutineInstance = new CRoutineCycle(TestCycle)
            emptyJSON = EmptyCycle
            conversion = CRoutineDay
            sanityCheck = ["Number of Sets", 1, 0]
            break;
        case "Routine":
            key = "Cycles"
            nonemptyJSON = TestRoutine
            CRoutineInstance = new CRoutine(TestRoutine)
            emptyJSON = EmptyRoutine
            conversion = CRoutineCycle
            sanityCheck = ["Length", 5, 0]
            break;
        default:
            break;
    }
        
    expect(CRoutineInstance[key][idx]).toMatchObject(nonemptyJSON[key][idx])
    expect(CRoutineInstance[key][idx][sanityCheck[0]]).toEqual(sanityCheck[1])
    expect(CRoutineInstance[key][idx][sanityCheck[0]]).not.toEqual(1337)
    CRoutineInstance.replace(idx, new conversion(emptyJSON[key][0]))
    expect(CRoutineInstance[key][idx]).toMatchObject(emptyJSON[key][0])
    expect(CRoutineInstance[key][idx][sanityCheck[0]]).toEqual(sanityCheck[2])
    expect(CRoutineInstance[key][idx][sanityCheck[0]]).not.toEqual(1337)
}

export function testReplaceEmpty(testTarget, idx){
    let key, nonemptyJSON, CRoutineInstance, emptyJSON, conversion, sanityCheck
    switch(testTarget){
        case "Day":
            key = "Sets"
            nonemptyJSON = TestDay
            CRoutineInstance = new CRoutineDay(EmptyDay)
            emptyJSON = EmptyDay
            conversion = CRoutineSet
            sanityCheck = ["defaultRepCD", 0, 40]
            break;
        case "Cycle":
            key = "Days"
            nonemptyJSON = TestCycle
            CRoutineInstance = new CRoutineCycle(EmptyCycle)
            emptyJSON = EmptyCycle
            conversion = CRoutineDay
            sanityCheck = ["Number of Sets", 0, 1]
            break;
        case "Routine":
            key = "Cycles"
            nonemptyJSON = TestRoutine
            CRoutineInstance = new CRoutine(EmptyRoutine)
            emptyJSON = EmptyRoutine
            conversion = CRoutineCycle
            sanityCheck = ["Length", 0, 5]
            break;
        default:
            break;
    }
    
    expect(CRoutineInstance[key]).toMatchObject(emptyJSON[key])
    expect(CRoutineInstance[key][idx][sanityCheck[0]]).toEqual(sanityCheck[1])
    expect(CRoutineInstance[key][idx][sanityCheck[0]]).not.toEqual(1337)
    CRoutineInstance.replace(idx, new conversion(nonemptyJSON[key][0]))
    expect(CRoutineInstance[key][idx]).toMatchObject(nonemptyJSON[key][0])
    expect(CRoutineInstance[key][idx][sanityCheck[0]]).toEqual(sanityCheck[2])
    expect(CRoutineInstance[key][idx][sanityCheck[0]]).not.toEqual(1337)
}

export function standaloneRCFinsert (arrIn, idx, valIn){
    if(idx>=arrIn.length) arrIn.push(valIn)
    else{
        arrIn.splice(idx, 0, valIn)
    }
        return arrIn
}

export function testInsert(CRoutineType){
    let testJSON, CRoutineInstance, key, conversion, itemToInsert
    switch(CRoutineType){
        case "Day":
            testJSON = ActuallyEmptyDay
            CRoutineInstance = new CRoutineDay(testJSON)
            key = "Sets"
            conversion = CRoutineSet
            break;
        case "Cycle":
            testJSON = ActuallyEmptyCycle
            CRoutineInstance = new CRoutineCycle(testJSON)
            key = "Days"
            conversion = CRoutineDay
            break;
        case "Routine":
            testJSON = ActuallyEmptyRoutine
            CRoutineInstance = new CRoutine(testJSON)
            key = "Cycles"
            conversion = CRoutineCycle
            break;
        default: 
            break;
    }
    expect(CRoutineInstance).toMatchObject(testJSON)
    //test empty
    //[]
    expect(CRoutineInstance[key].length).toEqual(0)
    itemToInsert = new conversion(testJSON)
    CRoutineInstance.insert(0, itemToInsert)
    expect(CRoutineInstance[key].length).toEqual(1)
    //[null]
    //test idx>len
    itemToInsert = new conversion(testJSON)
    itemToInsert["tV1"] = 1337
    CRoutineInstance.insert(2, itemToInsert)
    expect(CRoutineInstance[key].length).toEqual(2)
    expect(CRoutineInstance[key][0].tV1).toBeUndefined()
    expect(CRoutineInstance[key][1].tV1).toEqual(1337)
     //[null, 1337]
    //test start
    itemToInsert = new conversion(testJSON)
    itemToInsert["tV1"] = 42
    CRoutineInstance.insert(0, itemToInsert)
    expect(CRoutineInstance[key].length).toEqual(3)
    expect(CRoutineInstance[key][1].tV1).toBeUndefined()
    expect(CRoutineInstance[key][0].tV1).toEqual(42)
    //[42, null, 1337]
    //test end
    itemToInsert = new conversion(testJSON)
    itemToInsert["tV1"] = 44
    CRoutineInstance.insert(2, itemToInsert)
    expect(CRoutineInstance[key].length).toEqual(4)
    expect(CRoutineInstance[key][3].tV1).toEqual(1337)
    expect(CRoutineInstance[key][2].tV1).toEqual(44)
    //[42, null, 44, 1337]
    //test middle
    itemToInsert = new conversion(testJSON)
    itemToInsert["tV1"] = 77
    CRoutineInstance.insert(2, itemToInsert)
    expect(CRoutineInstance[key].length).toEqual(5)
    expect(CRoutineInstance[key][3].tV1).toEqual(44)
    expect(CRoutineInstance[key][2].tV1).toEqual(77)
    expect(CRoutineInstance[key][1].tV1).toBeUndefined()
}
        
export function standaloneRCFremove (arrIn, idx){
    if(idx>=arrIn) return 0
    else{
        arrIn.splice(idx, 1)
        return arrIn
    }
}

//I found it difficult to keep track of the what is going on with the nesting so i 
//broke it down into more obvious variables. Code above should probably be changes
//to fit that pattern eventually.

const emptyDay = TestRoutine.Cycles[0].Days[1]
const len1Day = TestRoutine.Cycles[0].Days[0]
const len3Day = TestRoutine.Cycles[0].Days[3]
const emptyCycle = ActuallyEmptyCycle
const len1Cycle = CycleLenOne
const len5Cycle = TestRoutine.Cycles[0]
const emptyRoutine = ActuallyEmptyRoutine
const len1Routine = RoutineLenOne
const len4Routine = TestRoutine

export function testRemove(testTarget, idx){
    let controlChoices, conversion, key
    switch(testTarget){
        case "Day":
            controlChoices = [emptyDay, len1Day, len3Day]
            conversion = CRoutineDay
            key="Sets"
            break;
        case "Cycle":
            controlChoices = [emptyCycle, len1Cycle, len5Cycle]
            conversion = CRoutineCycle
            key = "Days"
            break;
        case "Routine":
            controlChoices = [emptyRoutine, len1Routine, len4Routine]
            conversion = CRoutine
            key = "Cycles"
            break;
        default:
            break;
    }
    const testChoices = []
    controlChoices.forEach(choice=> testChoices.push(new conversion(choice)))
    //remove from empty array
    expect(testChoices[0].remove(0)).toEqual(0)
    //remove when idx>length
    expect(testChoices[1].remove(1)).toEqual(0)
    expect(testChoices[1]).toMatchObject(controlChoices[1])
    //remove from arr.len = 1
    expect(testChoices[1].remove(0)).toEqual(1)
    expect(testChoices[1][key].length).toEqual(0)
    //remove at start
    expect(testChoices[2].remove(0)).toEqual(1)
    expect(testChoices[2][key].length).toEqual(controlChoices[2][key].length-1)
    expect(testChoices[2][key]).toMatchObject(controlChoices[2][key].filter((item, idx) => idx!==0))
    //remove in the middle
    testChoices[2] = new conversion(controlChoices[2])
    expect(testChoices[2].remove(1)).toEqual(1)
    expect(testChoices[2][key].length).toEqual(controlChoices[2][key].length-1)
    expect(testChoices[2][key]).toMatchObject(controlChoices[2][key].filter((item, idx) => idx!==1))
    //remove in the end
    testChoices[2] = new conversion(controlChoices[2])
    const lastIdx = testChoices[2][key].length-1
    expect(testChoices[2].remove(lastIdx)).toEqual(1)
    expect(testChoices[2][key].length).toEqual(controlChoices[2][key].length-1)
    expect(testChoices[2][key]).toMatchObject(controlChoices[2][key].filter((item, idx) => idx!==lastIdx))
}

export function standaloneRCFduplicate(arrIn, idx){
    if(idx>=arrIn.length) return 0
    else{
        arrIn.splice(idx, 0, arrIn[idx].copy())
        return 1
    }
}

export function standaloneRCFswap(arrIn, idxMoved, idxMovedTo){
    if(Math.max(idxMoved, idxMovedTo)>=arrIn.length) return 0
    else{
        const temp = arrIn[idxMoved]
        if(Math.abs(idxMoved-idxMovedTo)===1){
            arrIn[idxMoved] = arrIn[idxMovedTo]
            arrIn[idxMovedTo] = temp
        }
        else{
            this.insert(idxMovedTo, temp)
            if(idxMovedTo<idxMoved) this.remove(idxMoved+1)
            else this.remove(idxMoved)
        }
        return 0
    }
}

