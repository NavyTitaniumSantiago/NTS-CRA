import React from 'react'
import './RoutineCustomization.css'
import {IRoutine} from '../interfaces.js'

interface IRoutineState{
    currentLocation: string;
    currentRoutine: IRoutine;
}

class RoutineCustomization extends React.Component<any, IRoutineState>{
    constructor(props:any){
        super(props)
        this.state = {
            currentLocation: 'routineCustomizationFrame',
            currentRoutine: this.props.history.location.state.currentRoutine
        }
    }
    render(){
        console.log(window.history.state)
        return(
            <div>
                RoutineCustomization
            </div>
        )
    }
}


export default RoutineCustomization