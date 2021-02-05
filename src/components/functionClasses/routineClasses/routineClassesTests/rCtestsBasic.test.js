import {LocalDataProcessor} from '../../fetchLocalData'
import {CincreaseStrategy, CRoutineSet, CRoutineDay, CRoutineCycle, CRoutine} from '../routineClasses'
import {EmptySet, EmptyDay, EmptyCycle, EmptyRoutine} from './routineClassesTestData'
import {incStratDefault, incStratCopy, testDefault, testCustom,
    testCopy, checkParentFunctionsExist
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

