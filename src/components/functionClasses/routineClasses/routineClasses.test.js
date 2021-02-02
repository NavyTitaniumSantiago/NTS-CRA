import {LocalDataProcessor} from '../fetchLocalData'
import {CincreaseStrategy, CRoutineSet, CRoutineDay, CRoutineCycle, CRoutine} from './routineClasses'
import {EmptySet, EmptyDay, EmptyCycle, EmptyRoutine, 
    ActuallyEmptyDay, ActuallyEmptyCycle, ActuallyEmptyRoutine} from './routineClassesTestData'
import {incStratDefault, incStratCopy, testDefault, testCustom,
    testCopy, checkParentFunctionsExist, standaloneRCFreplace, 
    testReplace, testReplaceEmpty, standaloneRCFinsert,
    testInsert, standaloneRCFremove, testRemove,
    standaloneRCFduplicate, testDuplicate,
    standaloneRCFmove
} from './rCtestsHelperFunctions.js'
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
describe("RoutineCommonFunction remove", ()=>{
    it("Works logically, decoupled from classes", ()=>{
        const arrsIn =  [[], [1], [1], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4]]
        const arrsOut = [0,   0,   [], [2, 3],    [1, 3, 4],    [1, 2, 3]]
        //remove from empty array
        expect(standaloneRCFremove(arrsIn[0], 0)).toEqual(0) 
        //remove when idx>length
        expect(standaloneRCFremove(arrsIn[1], 15)).toEqual(0)
        //remove from arr.len = 1
        expect(standaloneRCFremove(arrsIn[2], 0)).toEqual([])
        //remove at start
        expect(standaloneRCFremove(arrsIn[3], 0)).toEqual(arrsOut[3])
        //remove in the middle
        expect(standaloneRCFremove(arrsIn[4], 1)).toEqual(arrsOut[4])
        //remove in the end
        expect(standaloneRCFremove(arrsIn[5], 3)).toEqual(arrsOut[5])
    })
    it("Works on Day", ()=>{
         testRemove("Day")
    })
    it("Works on Cycle", ()=>{
        testRemove("Cycle")
    })
    it("Works on Routine", ()=>{
        testRemove("Routine")
    })
})
describe("RoutineCommonFunction duplicate", ()=>{
    it("Works logically, decoupled from classes", ()=>{
        const arrsIn =  [[], [1], [1],   [1, 2, 3],    [1, 2, 3, 4],    [1, 2, 3, 4]]
        const arrsOut = [0,   0,  [1,1], [1, 1, 2, 3], [1, 2, 2, 3, 4], [1, 2, 3, 4, 4]]
        //duplicate from empty array
        expect(standaloneRCFduplicate(arrsIn[0], 0)).toEqual(0) 
        //duplicate when idx>length
        expect(standaloneRCFduplicate(arrsIn[1], 15)).toEqual(0)
        //duplicate from arr.len = 1
        expect(standaloneRCFduplicate(arrsIn[2], 0)).toEqual(arrsOut[2])
        //duplicate at start
        expect(standaloneRCFduplicate(arrsIn[3], 0)).toEqual(arrsOut[3])
        //duplicate in the middle
        expect(standaloneRCFduplicate(arrsIn[4], 1)).toEqual(arrsOut[4])
        //duplicate in the end
        expect(standaloneRCFduplicate(arrsIn[5], 3)).toEqual(arrsOut[5])
    })
    it("Works on Day", ()=>{
        testDuplicate("Day")
   })
   it("Works on Cycle", ()=>{
        testDuplicate("Cycle")
   })
   it("Works on Routine", ()=>{
        testDuplicate("Routine")
   })
})
//this used to be called swap. leaving the mention in case it breaks
//because swap is meant to be used to respond to items being dragged it actually just
//moved the item to a new location. Perhaps swap is a misnomer and it needs to be renamed.
describe("RoutineCommonFunction move", ()=>{
    it("Works logically, decoupled from classes", ()=>{
        //Test Arrs for illegal moves
        let arrsIn =  [[], [1, 2], [1]]
        let arrsOut = [0,   0,      0 ]
        //move on empty array -> shouldnt work
        expect(standaloneRCFmove(arrsIn[0], 0, 1)).toEqual(0) 
        //move when idxMove>length -> shouldnt work
        expect(standaloneRCFmove(arrsIn[1], 3, 1)).toEqual(0) 
        //move when idxMoveTo>length -> shouldnt work
        expect(standaloneRCFmove(arrsIn[1], 1, 3)).toEqual(0)
        //move from arr.len = 1 -> shouldnt work
        expect(standaloneRCFmove(arrsIn[2], 0, 0)).toEqual(0)
        //SEQUENTIAL INDEXES
        //Test Arrs for sequential moves
        arrsIn =  [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4]]
        arrsOut = [[2, 1, 3], [2, 1, 3], [1, 3, 2], [1, 3, 2], [1, 3, 2, 4], [1, 3, 2, 4]]
        //move at start
            //idxMove<idxMovedTo
            expect(standaloneRCFmove(arrsIn[0], 0, 1)).toEqual(arrsOut[0])
            //idxMove>idxMovedTo
            expect(standaloneRCFmove(arrsIn[1], 1, 0)).toEqual(arrsOut[1])
        //move in the end
            //idxMove<idxMovedTo
            expect(standaloneRCFmove(arrsIn[2], 1, 2)).toEqual(arrsOut[2])
            //idxMove>idxMovedTo
            expect(standaloneRCFmove(arrsIn[3], 2, 1)).toEqual(arrsOut[3])
        //move in the middle
            //idxMove>idxMovedTo
            expect(standaloneRCFmove(arrsIn[4], 1, 2)).toEqual(arrsOut[4])
            //idxMove<idxMovedTo
            expect(standaloneRCFmove(arrsIn[5], 2, 1)).toEqual(arrsOut[5])
        //GAPPED INDEXES
        //Test Arrs for gapped moves
        //move at start
            arrsIn =  [[1, 2, 3, 4], [1, 2, 3, 4]]
            arrsOut = [[2, 3, 1, 4], [3, 1, 2, 4]]
            //idxMove>idxMovedTo
            expect(standaloneRCFmove(arrsIn[0], 0, 2)).toEqual(arrsOut[0])
            //idxMove<idxMovedTo
            expect(standaloneRCFmove(arrsIn[1], 2, 0)).toEqual(arrsOut[1])
        //move in the end
            arrsIn =  [[1, 2, 3, 4], [1, 2, 3, 4]]
            arrsOut = [[1, 3, 4, 2], [1, 4, 2, 3]]
            //idxMove>idxMovedTo
            expect(standaloneRCFmove(arrsIn[0], 1, 3)).toEqual(arrsOut[0])
            //idxMove<idxMovedTo
            expect(standaloneRCFmove(arrsIn[1], 3, 1)).toEqual(arrsOut[1])
        //move in the middle
            //idxMove>idxMovedTo
            //idxMove<idxMovedTo
        //move start<->end
            //idxMove>idxMovedTo
            //idxMove<idxMovedTo
         
    })
})