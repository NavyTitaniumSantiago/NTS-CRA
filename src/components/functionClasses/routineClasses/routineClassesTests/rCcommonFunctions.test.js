import {LocalDataProcessor} from '../../fetchLocalData'
import {CincreaseStrategy, CRoutineSet, CRoutineDay, CRoutineCycle, CRoutine} from '../routineClasses'
import {EmptySet, EmptyDay, EmptyCycle, EmptyRoutine, 
    ActuallyEmptyDay, ActuallyEmptyCycle, ActuallyEmptyRoutine} from './routineClassesTestData'
import {incStratDefault, incStratCopy, testDefault, testCustom,
    testCopy, checkParentFunctionsExist, standaloneRCFreplace, 
    testReplace, testReplaceEmpty, standaloneRCFinsert,
    testInsert, standaloneRCFremove, testRemove,
    standaloneRCFduplicate, testDuplicate,
    standaloneRCFmove, testMove_Illegal, testMove_Sequential,
    testMove_GAP_END, testMove_GAP_MIDDLE, testMove_GAP_START, 
    testMove_GAP_START_END
} from './rCtestsHelperFunctions.js'

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