import {createContext, useState, useCallback} from 'react'
import {IRoutine} from '../components/interfaces'

interface IRoutineContext{
    Routine:IRoutine,
    setRoutine: (newRoutine: IRoutine) => void
}

const RoutineContext = createContext<Partial<IRoutineContext>>({})
export const useRoutine = (): IRoutineContext => {
    const [Routine, setCurrentRoutine] = useState(null)
    const setRoutine = useCallback((currentRoutine: IRoutine): void =>{
        setCurrentRoutine(currentRoutine)
    }, [])
    return {
        Routine, setRoutine
    }
}
RoutineContext.displayName = "RoutineContext"
export default RoutineContext
