import {routineTypes} from '../../data/routineTypes'
import {IRoutine} from './interfacesFunctionClasses'
import routines from '../../data/routines.json'

export class LocalDataProcessor {
    static getRoutineNameByKeywords(choices: Array<string>): Array<string>{
        const compatibleRoutines:Array<string> = []
        routineTypes.forEach(routine => {
            if(routine['Focus'].split(' ')[0] === choices[0].split(' ')[0] && routine['Difficulty'] === choices[1]){
                compatibleRoutines.push(routine["Name"])
            }
        })
        return compatibleRoutines
    }
    static getRoutineByRoutineName(name: string): IRoutine | null{
        let selectedRoutine: IRoutine
        //console.log(typeof routines)
        for(let key in routines){
            if(key === name){
                selectedRoutine = routines[key]
                return selectedRoutine
            }
        }
        return null
    }
}

