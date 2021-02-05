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

describe("standaloneRFCmove works logically, decoupled from classes", ()=>{
    let arrsIn, arrsOut, arrsInA, arrsInB, arrsOutA, arrsOutB
    it("Returns 0 when receiving an illegal request", ()=>{
        //Test Arrs for illegal moves
        arrsIn =  [[], [1, 2], [1]]
        arrsOut = [0,   0,      0 ]
        //move on empty array -> shouldnt work
        expect(standaloneRCFmove(arrsIn[0], 0, 1)).toEqual(0) 
        //move when idxMove>length -> shouldnt work
        expect(standaloneRCFmove(arrsIn[1], 3, 1)).toEqual(0) 
        //move when idxMoveTo>length -> shouldnt work
        expect(standaloneRCFmove(arrsIn[1], 1, 3)).toEqual(0)
        //move from arr.len = 1 -> shouldnt work
        expect(standaloneRCFmove(arrsIn[2], 0, 0)).toEqual(0)
    })
    it("Works for sequential index moves(swaps)", ()=>{
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
    })
    it("Works for gapped indexes", ()=>{
        //GAPPED INDEXES
        //Test Arrs for gapped moves
        //move at start
            arrsInB =  [[1, 2, 3, 4], [1, 2, 3, 4]]
            arrsOutB = [[2, 1, 3, 4], [3, 1, 2, 4]]
            arrsInA =  [[1, 2, 3, 4], [1, 2, 3, 4]]
            arrsOutA = [[2, 3, 1, 4], [1, 3, 2, 4]]
            //idxMove>idxMovedTo
                //before
                expect(standaloneRCFmove(arrsInB[0], 0, 2)).toEqual(arrsOutB[0])
                //after
                expect(standaloneRCFmove(arrsInA[0], 0, 2, 0, 1)).toEqual(arrsOutA[0])
            //idxMove<idxMovedTo
                //before
                expect(standaloneRCFmove(arrsInB[1], 2, 0)).toEqual(arrsOutB[1])
                //after
                expect(standaloneRCFmove(arrsInA[1], 2, 0, 0, 1)).toEqual(arrsOutA[1])
        //move to the end
            arrsInB =  [[1, 2, 3, 4], [1, 2, 3, 4]]
            arrsOutB = [[1, 3, 2, 4], [1, 4, 2, 3]]
            arrsInA =  [[1, 2, 3, 4], [1, 2, 3, 4]]
            arrsOutA = [[1, 3, 4, 2], [1, 2, 4, 3]]
            //idxMove>idxMovedTo
                //before
                expect(standaloneRCFmove(arrsInB[0], 1, 3)).toEqual(arrsOutB[0])
                //after
                expect(standaloneRCFmove(arrsInA[0], 1, 3, 0, 1)).toEqual(arrsOutA[0])
            //idxMove<idxMovedTo
                //before
                expect(standaloneRCFmove(arrsInB[1], 3, 1)).toEqual(arrsOutB[1])
                //after
                expect(standaloneRCFmove(arrsInA[1], 3, 1, 0, 1)).toEqual(arrsOutA[1])
        //move in the middle
            arrsInB =  [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
            arrsOutB = [[1, 3, 2, 4, 5], [1, 4, 2, 3, 5]]
            arrsInA =  [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
            arrsOutA = [[1, 3, 4, 2, 5], [1, 2, 4, 3, 5]]
            //idxMove>idxMovedTo
                //before
                expect(standaloneRCFmove(arrsInB[0], 1, 3)).toEqual(arrsOutB[0])
                //after
                expect(standaloneRCFmove(arrsInA[0], 1, 3, 0, 1)).toEqual(arrsOutA[0])
            //idxMove<idxMovedTo
                //before
                expect(standaloneRCFmove(arrsInB[1], 3, 1)).toEqual(arrsOutB[1])
                //after
                expect(standaloneRCFmove(arrsInA[1], 3, 1, 0, 1)).toEqual(arrsOutA[1])
        //move start<->end
            arrsInB =  [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
            arrsOutB = [[2, 3, 4, 1, 5], [5, 1, 2, 3, 4]]
            arrsInA =  [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]
            arrsOutA = [[2, 3, 4, 5, 1], [1, 5, 2, 3, 4]]
            //idxMove>idxMovedTo
                //before
                expect(standaloneRCFmove(arrsInB[0], 0, 4)).toEqual(arrsOutB[0])
                //after
                expect(standaloneRCFmove(arrsInA[0], 0, 4, 0, 1)).toEqual(arrsOutA[0])
            //idxMove<idxMovedTo
                //before
                expect(standaloneRCFmove(arrsInB[1], 4, 0)).toEqual(arrsOutB[1])
                //after
                expect(standaloneRCFmove(arrsInA[1], 4, 0, 0, 1)).toEqual(arrsOutA[1])
    })
})

describe("RoutineCommonFunctions Illegal Moves", ()=>{
    it("Works for Day", ()=>{
        testMove_Illegal("Day")
    })
    it("Works for Cycle", ()=>{
        testMove_Illegal("Cycle")
    })
    it("Works for Routine", ()=>{
        testMove_Illegal("Routine")
    })
})

describe("RoutineCommonFunctions Sequential Moves", ()=>{
    it("Works for Day", ()=>{
        testMove_Sequential("Day")
    })
    it("Works for Cycle", ()=>{
        testMove_Sequential("Cycle")
    })
    it("Works for Routine", ()=>{
        testMove_Sequential("Routine")
    })
})


describe("RoutineCommonFunctions Gapped Moves when an idx = 0", ()=>{
    it("Works for Day", ()=>{
        testMove_GAP_START("Day")
    })
    it("Works for Cycle", ()=>{
        testMove_GAP_START("Cycle")
    })
    it("Works for Routine", ()=>{
        testMove_GAP_START("Routine")
    })
})
describe("RoutineCommonFunctions Gapped Moves when an idx = len-1", ()=>{
    it("Works for Day", ()=>{
        testMove_GAP_END("Day")
    })
    it("Works for Cycle", ()=>{
        testMove_GAP_END("Cycle")
    })
    it("Works for Routine", ()=>{
        testMove_GAP_END("Routine")
    })
})
describe("RoutineCommonFunctions Gapped Moves when middle elements are swapped", ()=>{
    it("Works for Day", ()=>{
        testMove_GAP_MIDDLE("Day")
    })
    it("Works for Cycle", ()=>{
        testMove_GAP_MIDDLE("Cycle")
    })
    it("Works for Routine", ()=>{
        testMove_GAP_MIDDLE("Routine")
    })
})
describe("RoutineCommonFunctions Gapped Moves when idx=0 & idx=len-1", ()=>{
    it("Works for Day", ()=>{
        testMove_GAP_START_END("Day")
    })
    it("Works for Cycle", ()=>{
        testMove_GAP_START_END("Cycle")
    })
    it("Works for Routine", ()=>{
        testMove_GAP_START_END("Routine")
    })
})