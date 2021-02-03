import {EmptySet, EmptyDay, EmptyCycle, EmptyRoutine, 
    ActuallyEmptyDay, ActuallyEmptyCycle, ActuallyEmptyRoutine} from './routineClassesTestData'
import {CincreaseStrategy, CRoutineSet, CRoutineDay, CRoutineCycle, CRoutine} from '../routineClasses'
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
    const funcArray = ['replace', 'insert', 'remove', 'duplicate', 'move']
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
    let testJSON, CRoutineInstance, key, conversion, itemToInsert, insertKey
    switch(CRoutineType){
        case "Day":
            testJSON = ActuallyEmptyDay
            CRoutineInstance = new CRoutineDay(testJSON)
            key = "Sets"
            insertKey = "defaultWeight"
            conversion = CRoutineSet
            break;
        case "Cycle":
            testJSON = ActuallyEmptyCycle
            CRoutineInstance = new CRoutineCycle(testJSON)
            key = "Days"
            insertKey = "Number of Sets"
            conversion = CRoutineDay
            break;
        case "Routine":
            testJSON = ActuallyEmptyRoutine
            CRoutineInstance = new CRoutine(testJSON)
            key = "Cycles"
            insertKey = "Length"
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
    itemToInsert[insertKey] = 1337
    CRoutineInstance.insert(2, itemToInsert)
    expect(CRoutineInstance[key].length).toEqual(2)
    expect(CRoutineInstance[key][0][insertKey]).toBeUndefined()
    expect(CRoutineInstance[key][1][insertKey]).toEqual(1337)
     //[null, 1337]
    //test start
    itemToInsert = new conversion(testJSON)
    itemToInsert[insertKey] = 42
    CRoutineInstance.insert(0, itemToInsert)
    expect(CRoutineInstance[key].length).toEqual(3)
    expect(CRoutineInstance[key][1][insertKey]).toBeUndefined()
    expect(CRoutineInstance[key][0][insertKey]).toEqual(42)
    //[42, null, 1337]
    //test end
    itemToInsert = new conversion(testJSON)
    itemToInsert[insertKey] = 44
    CRoutineInstance.insert(2, itemToInsert)
    expect(CRoutineInstance[key].length).toEqual(4)
    expect(CRoutineInstance[key][3][insertKey]).toEqual(1337)
    expect(CRoutineInstance[key][2][insertKey]).toEqual(44)
    //[42, null, 44, 1337]
    //test middle
    itemToInsert = new conversion(testJSON)
    itemToInsert[insertKey] = 77
    CRoutineInstance.insert(2, itemToInsert)
    expect(CRoutineInstance[key].length).toEqual(5)
    expect(CRoutineInstance[key][3][insertKey]).toEqual(44)
    expect(CRoutineInstance[key][2][insertKey]).toEqual(77)
    expect(CRoutineInstance[key][1][insertKey]).toBeUndefined()
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

const emptyDay = new CRoutineDay(TestRoutine.Cycles[0].Days[1])
const len1Day = new CRoutineDay(TestRoutine.Cycles[0].Days[0])
const len3Day = new CRoutineDay(TestRoutine.Cycles[0].Days[3])
const emptyCycle = new CRoutineCycle(ActuallyEmptyCycle)
const len1Cycle = new CRoutineCycle(CycleLenOne)
const len5Cycle = new CRoutineCycle(TestRoutine.Cycles[0])
const emptyRoutine = new CRoutine(ActuallyEmptyRoutine)
const len1Routine = new CRoutine(RoutineLenOne)
const len4Routine = new CRoutine(TestRoutine)

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
        arrIn.splice(idx, 0, arrIn[idx])
        return arrIn
    }
}

export function testDuplicate(testTarget, idx){
    //the switch cases are duplicated for readibility
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
    //duplicate from empty array
    expect(testChoices[0].duplicate(0)).toEqual(0)
    //duplicate when idx>length
    expect(testChoices[1].duplicate(1)).toEqual(0)
    expect(testChoices[1][key].length).toEqual(controlChoices[1][key].length)
    //duplicate at start
    expect(testChoices[1].duplicate(0)).toEqual(1)
    expect(testChoices[1][key].length).toEqual(2)
    expect(testChoices[1][key][0]).toMatchObject(testChoices[1][key][1])
    //duplicate in the middle
    expect(testChoices[2].duplicate(1)).toEqual(1)
    expect(testChoices[2][key].length).toEqual(controlChoices[2][key].length+1)
    expect(testChoices[2][key][1]).toMatchObject(testChoices[2][key][2])
    //duplicate in the end
    testChoices[2] = new conversion(controlChoices[2])
    const lastIdx = controlChoices[2][key].length-1
    expect(testChoices[2].duplicate(lastIdx)).toEqual(1)
    expect(testChoices[2][key].length).toEqual(lastIdx+2)
    expect(testChoices[2][key][lastIdx]).toMatchObject(testChoices[2][key][lastIdx+1])
}


export function standaloneRCFmove(arrIn, idxMoved, idxMovedTo, beforeOrAfter = "before"){
    if(Math.max(idxMoved, idxMovedTo)>=arrIn.length || arrIn.length === 1) return 0
    else if(idxMoved===idxMovedTo) return arrIn
    else{
        const temp = arrIn[idxMoved]
        if(Math.abs(idxMoved-idxMovedTo)===1){
            arrIn[idxMoved] = arrIn[idxMovedTo]
            arrIn[idxMovedTo] = temp
        }
        else{
            if(beforeOrAfter === "after") idxMovedTo++
            standaloneRCFinsert(arrIn, idxMovedTo, temp)
            if(idxMoved<idxMovedTo){
                standaloneRCFremove(arrIn, idxMoved)
            }else if(idxMovedTo<idxMoved){
                standaloneRCFremove(arrIn, idxMoved+1)
            } 
        }
        return arrIn
    }
}

export function testMove_Illegal(testTarget){
        //the switch cases are duplicated for readibility
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
        //ILLEGAL MOVES
        //move on empty array -> shouldnt work
        expect(testChoices[0].move(1,2)).toEqual(0)
        //move from arr.len = 1 -> shouldnt work
        expect(testChoices[1].move(0, 0)).toEqual(0)
        //move when idxMove>length -> shouldnt work
        expect(testChoices[2].move(15,1)).toEqual(0)
        //move when idxMoveTo>length -> shouldnt work
        expect(testChoices[2].move(15,1)).toEqual(0)
        //move when both idx> length
        expect(testChoices[2].move(15,15)).toEqual(0)
}

function testMoveSwitch(testTarget){
    let controlChoice, conversion, key
    switch(testTarget){//all arrays on empty and 1 len are done in testMove_illegal
        case "Day":
            len3Day.insert(TestSet, 5)
            len3Day.insert(TestSet, 5)
            controlChoice = len3Day
            conversion = CRoutineDay
            key="Sets"
            break;
        case "Cycle":
            controlChoice = len5Cycle
            conversion = CRoutineCycle
            key = "Days"
            break;
        case "Routine":
            len4Routine.insert(TestCycle, 5)
            controlChoice = len4Routine
            conversion = CRoutine
            key = "Cycles"
            break;
        default:
            break;
    }
    return {controlChoice, conversion, key}
}

export function testMove_Sequential(testTarget){
    const {controlChoice, conversion, key} = testMoveSwitch(testTarget)
    let testChoice = new conversion(controlChoice)
    //SEQUENTIAL MOVES
    //the mechanism for sequential moves it the same so with standalone testing working properly
    //it feels excessive to test it here as well.
    //move at start
    expect(testChoice.move(0,1)).toEqual(1)
    expect(testChoice[key][0]).toEqual(controlChoice[key][1])
    expect(testChoice[key][1]).toEqual(controlChoice[key][0])
    //move in the end
    testChoice = new conversion(controlChoice)
    expect(testChoice.move(3,4)).toEqual(1)
    expect(testChoice[key][3]).toEqual(controlChoice[key][4])
    expect(testChoice[key][4]).toEqual(controlChoice[key][3])
    //move in the middle
    testChoice = new conversion(controlChoice)
    expect(testChoice.move(2,3)).toEqual(1)
    expect(testChoice[key][2]).toEqual(controlChoice[key][3])
    expect(testChoice[key][3]).toEqual(controlChoice[key][2])
}

//originially i wanted to write functions to removed the redundancy in the following 
//but reducing repetition increases complexity
//and who tests the testmen

export function testMove_GAP_START(testTarget){
    const {controlChoice, conversion, key} = testMoveSwitch(testTarget)
    let testChoice = new conversion(controlChoice)
    //console.log(testChoice[key][0], controlChoice[key][0])
    //Before
        //idxMove<idxMovedTo
        expect(testChoice.move(0,3)).toEqual(1)
        expect(testChoice[key][0]).toEqual(controlChoice[key][1])
        expect(testChoice[key][1]).toEqual(controlChoice[key][2])
        expect(testChoice[key][2]).toEqual(controlChoice[key][0])
        expect(testChoice[key][3]).toEqual(controlChoice[key][3])
        expect(testChoice[key][4]).toEqual(controlChoice[key][4])
        //idxMove>idxMovedTo
        testChoice = new conversion(controlChoice)
        expect(testChoice.move(3,0)).toEqual(1)
        expect(testChoice[key][0]).toEqual(controlChoice[key][3])
        expect(testChoice[key][1]).toEqual(controlChoice[key][0])
        expect(testChoice[key][2]).toEqual(controlChoice[key][1])
        expect(testChoice[key][3]).toEqual(controlChoice[key][2])
        expect(testChoice[key][4]).toEqual(controlChoice[key][4])
    //After
        //idxMove<idxMovedTo
        testChoice = new conversion(controlChoice)
        expect(testChoice.move(0,3, "after")).toEqual(1)
        expect(testChoice[key][0]).toEqual(controlChoice[key][1])
        expect(testChoice[key][1]).toEqual(controlChoice[key][2])
        expect(testChoice[key][2]).toEqual(controlChoice[key][3])
        expect(testChoice[key][3]).toEqual(controlChoice[key][0])
        expect(testChoice[key][4]).toEqual(controlChoice[key][4])
        //idxMove>idxMovedTo
        testChoice = new conversion(controlChoice)
        expect(testChoice.move(3,0, "after")).toEqual(1)
        expect(testChoice[key][0]).toEqual(controlChoice[key][0])
        expect(testChoice[key][1]).toEqual(controlChoice[key][3])
        expect(testChoice[key][2]).toEqual(controlChoice[key][1])
        expect(testChoice[key][3]).toEqual(controlChoice[key][2])
        expect(testChoice[key][4]).toEqual(controlChoice[key][4])
}

export function testMove_GAP_END(testTarget){
    const {controlChoice, conversion, key} = testMoveSwitch(testTarget)
    let testChoice = new conversion(controlChoice)
}

export function testMove_GAP_MIDDLE(testTarget){
    const {controlChoice, conversion, key} = testMoveSwitch(testTarget)
    let testChoice = new conversion(controlChoice)
}
export function testMove_GAP_START_END(testTarget){
    const {controlChoice, conversion, key} = testMoveSwitch(testTarget)
    let testChoice = new conversion(controlChoice)
}