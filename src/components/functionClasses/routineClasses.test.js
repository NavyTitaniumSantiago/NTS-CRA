import {LocalDataProcessor} from './fetchLocalData'
import {IincreaseStrategy, IRoutineSet, IRoutineDay, IRoutineCycle, IRoutine} from './interfacesFunctionClasses'
import {CincreaseStrategy, CRoutineSet, CRoutineDay, CRoutineCycle, CRoutine} from './routineClasses'
import {EmptySet, EmptyDay, EmptyCycle, EmptyRoutine, 
    ActuallyEmptyDay, ActuallyEmptyCycle, ActuallyEmptyRoutine} from './routineClassesTestData'
const TestRoutine = LocalDataProcessor.getRoutineByRoutineName("Ceonxiy")

describe("TestRoutine loads correctly", ()=>{
    it("loads", ()=>{
        expect(TestRoutine).not.toBeNull()
        }
    )
    it("Has all appropriate attributes", ()=>{
        expect(TestRoutine["Difficulty Level"]).toEqual("Advanced")
        expect(TestRoutine["Focus"]).toEqual("Weightloss")
        expect(TestRoutine["Total Length"]).toEqual(12)
        expect(TestRoutine["Number of Cycles"]).toEqual(4)
        expect(TestRoutine["Cycles"].length).toEqual(4)
    })
})
const TestIncStrat = TestRoutine.Cycles[0].Days[0].Sets[0].defaultIncreaseStrategy
const TestSet = TestRoutine.Cycles[0].Days[0].Sets[0]
const TestDay = TestRoutine.Cycles[1].Days[0]
const TestCycle = TestRoutine.Cycles[0]

describe("Sub-objects load correctly", ()=>{
    it("TestIncStrat", ()=>{
        expect(TestIncStrat).not.toBeNull()
        expect(TestIncStrat.increaseWhen).toEqual(30)
    })
    it("TestSet", ()=>{
        expect(TestSet).not.toBeNull()
        expect(TestSet.Exercise).toEqual("Lower Crunch")
    })
    it("TestDay", ()=>{
        expect(TestDay).not.toBeNull()
        expect(TestDay["Is rest day"]).toEqual(false)
    })
    it("TestCycle", ()=>{
        expect(TestCycle).not.toBeNull()
        expect(TestCycle.Length).toEqual(5)
    })
})

//  expect().toEqual()
describe("Empty CincreaseStrategy is created appropriately", ()=>{
    let CincStrat
    beforeAll(()=>{
        CincStrat = new CincreaseStrategy()
    })
    it("instantiates", ()=>{
        expect(CincStrat).not.toBeNull()
    })
    it("has default values", ()=>{
       incStratDefault(CincStrat, 0, 0)
    })
})

describe("NonEmpty CincreaseStrategy is created appropriately", ()=>{
    
    let CincStrat = new CincreaseStrategy(TestIncStrat)

    it("instantiates", ()=>{
        expect(CincStrat).not.toBeNull()
    })
    it("has default values", ()=>{
        incStratDefault(CincStrat, TestIncStrat.increaseBy, TestIncStrat.increaseWhen)
    })
    it("deepcopies", ()=>{
        incStratCopy(CincStrat, TestIncStrat.increaseBy, TestIncStrat.increaseWhen)
    })
})

describe("CRoutineSet works", ()=>{
    it("CRoutineSet works with default values", ()=>{
        testDefault(CRoutineSet, EmptySet)
    })
    it("CRoutineSet works with custom values", ()=>
    {
        testCustom(CRoutineSet, TestSet)
    })
    it("CRoutineSet deepcopies", ()=>{
        testCopy(CRoutineSet, TestSet, "defaultWeight")
    })
})

describe("CRoutineDay works", ()=>{
    it("CRoutineDay works with default values", ()=>{
        testDefault(CRoutineDay, EmptyDay)
    })
    it("CRoutineDay works with custom values", ()=>
    {
        testCustom(CRoutineDay, TestDay)
    })
    it("CRoutineDay deepcopies", ()=>{
        testCopy(CRoutineDay, TestDay, "Number of Sets")
    })
})

describe("CRoutineCycle works", ()=>{
    it("CRoutineCycle works with default values", ()=>{
        testDefault(CRoutineCycle, EmptyCycle)
    })
    it("CRoutineCycle works with custom values", ()=>
    {
        testCustom(CRoutineCycle, TestCycle)
    })
    it("CRoutineCycle deepcopies", ()=>{
        testCopy(CRoutineCycle, TestCycle, "Length")
    })
})

describe("CRoutine works", ()=>{
    it("CRoutine works with default values", ()=>{
        testDefault(CRoutine, EmptyRoutine)
    })
    it("CRoutine works with custom values", ()=>
    {
        testCustom(CRoutine, TestRoutine)
    })
    it("CRoutine deepcopies", ()=>{
        testCopy(CRoutine, TestRoutine, "Number of Cycles")
    })
})
describe("RoutineCommonFunction passed down functions", () =>{
    it("Exist on Day", () => {
        checkParentFunctionsExist(new CRoutineDay(TestDay))
    })
    it("Exist on Cycle", () => {
        checkParentFunctionsExist(new CRoutineCycle(TestCycle))
    })
    it("Exist on Routine", () => {
        checkParentFunctionsExist(new CRoutine(TestRoutine))
    })
})
//test these functions detached too
describe("RoutineCommonFunction replace", ()=>{
    it("Works logically, decoupled from classes", ()=>{
        const arrsIn = [[1,2,3], [], [1],]
        const arrsOut = [[1, 15, 3], [15], [15]]
        expect(standaloneRCFreplace(arrsIn[0], 1, 15)).toEqual(arrsOut[0])
        expect(standaloneRCFreplace(arrsIn[1], 0, 15)).toEqual(arrsOut[1])
        expect(standaloneRCFreplace(arrsIn[2], 0, 15)).toEqual(arrsOut[2])
    })
    it("Works on Day", ()=>{
        testReplace("Day", 1)
    })
    it("Works on Cycle", ()=>{
        testReplace("Cycle", 0)
    })
    it("Works on Routine", ()=>{
        testReplace("Routine", 0)
    })
    it("Works on Empty Day", ()=>{
        testReplaceEmpty("Day", 0, true)
    })
    it("Works on Empty Cycle", ()=>{
        testReplaceEmpty("Cycle", 0, true)
    })
    it("Works on Empty Routine", ()=>{
        testReplaceEmpty("Routine", 0, true)
    })
})
describe("RoutineCommonFunction insert", ()=>{
    it("Works logically, decoupled from classes", ()=>{
        const arrsIn = [[], [1],[1, 2, 3], [1, 2, 3], [1, 2, 3, 4]]
        const arrsOut = [[15], [1, 15], [15, 1, 2, 3], [1, 15, 2, 3], [1, 2, 3, 15, 4]]
        //insert into empty array
        expect(standaloneRCFinsert(arrsIn[0], 0, 15)).toEqual(arrsOut[0]) 
        //insert when idx>length
        expect(standaloneRCFinsert(arrsIn[1], 15, 15)).toEqual(arrsOut[1])
        //insert at start
        expect(standaloneRCFinsert(arrsIn[2], 0, 15)).toEqual(arrsOut[2])
        //insert in the middle
        expect(standaloneRCFinsert(arrsIn[3], 1, 15)).toEqual(arrsOut[3])
        //insert in the end
        expect(standaloneRCFinsert(arrsIn[4], 3, 15)).toEqual(arrsOut[4])
    })
    it("Works on Day", ()=>{
         testInsert("Day")
    })
    it("Works on Cycle", ()=>{
        testInsert("Cycle")
    })
    it("Works on Routine", ()=>{
        testInsert("Routine")
    })

})

function incStratDefault(objIn, valOne, valTwo){
    expect(objIn.increaseBy).toEqual(valOne)
    expect(objIn.increaseWhen).toEqual(valTwo)
}

function incStratCopy(objIn, valOne, valTwo){
        const CincStratCopy = objIn.copy()
        const updTwo = valTwo+1
        expect(CincStratCopy.increaseBy).toEqual(valOne)
        expect(CincStratCopy.increaseWhen).toEqual(valTwo)
        objIn.increaseWhen = updTwo
        expect(objIn.increaseWhen).toEqual(updTwo)
        expect(CincStratCopy.increaseWhen).toEqual(valTwo)
}

function testDefault(classIn, testObj){
    //console.log(testObj)
    const Ctest = new classIn()
    expect(Ctest).not.toBeNull()
    expect(Ctest).toMatchObject(testObj)

}
function testCustom(classIn, testObj){
    const Ctest = new classIn(testObj)
    expect(Ctest).not.toBeNull()
    expect(Ctest).toMatchObject(testObj)
}

function testCopy(classIn, testObj, whatToChange){
    const Ctest = new classIn(testObj)
    expect(Ctest).not.toBeNull()
    const CtestCopy = Ctest.copy()
    expect(CtestCopy[whatToChange]).toEqual(Ctest[whatToChange])
    CtestCopy[whatToChange] = 1337
    expect(CtestCopy[whatToChange]).toEqual(1337)
    expect(Ctest[whatToChange]).toEqual(Ctest[whatToChange])
}

function checkParentFunctionsExist(classIn){
    const funcArray = ['replace', 'insert', 'remove', 'duplicate', 'swap']
    for(let i = 0; i<funcArray.length; i++){
        expect(typeof classIn[funcArray[i]]).toEqual('function')
    }
}

function standaloneRCFreplace (arrIn, idx, valIn){
    if(idx>=arrIn.length){
        arrIn.push(valIn)
    }
    else{
        arrIn[idx] = valIn
    }
    return arrIn
}

function testReplace(testTarget, idx){
    // iterables are:
    //     "CRoutineDay": "Sets",
    //     "CRoutineCycle": "Days",
    //     "CRoutine": "Cycles"
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

function testReplaceEmpty(testTarget, idx){
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

function standaloneRCFinsert (arrIn, idx, valIn){
    if(idx>=arrIn.length) arrIn.push(valIn)
    else{
        arrIn.splice(idx, 0, valIn)
    }
        return arrIn
}

function testInsert(CRoutineType){
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
        
function standaloneRCFremove (arrIn, idx){
    if(idx>=arrIn) return 0
    else{
        arrIn(idx, 1)
        return 1
    }
}

function standaloneRCFduplicate(arrIn, idx){
    if(idx>=arrIn.length) return 0
    else{
        arrIn.splice(idx, 0, arrIn[idx].copy())
        return 1
    }
}

function standaloneRCFswap(arrIn, idxMoved, idxMovedTo){
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