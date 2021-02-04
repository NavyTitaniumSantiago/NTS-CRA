import React from 'react'
import {IRoutineDay, IRoutineSet} from '../interfaces.js'
import ButtonGroup from './buttonGroup'
import { v4 as uuidv4 } from 'uuid'
import {CRoutineCycle} from '../functionClasses/routineClasses/routineClasses'

interface ICycleWindowProps{
    passThroughCycle: CRoutineCycle
    handleSetClick: (event: React.MouseEvent<HTMLButtonElement>, sourceID?: Array<number>) => void
    handleDragging: (event: any, sourceID?: Array<number>) => void
    currentCycle: number
    editing: boolean
}

const CycleWindow: React.FC<ICycleWindowProps> = props =>{
  
    return(
        <div className = "row" id="routineDisplayArea">
        <div className = "col col-sm-12 ps-0">
                {props.passThroughCycle && props.passThroughCycle.Days.map((day, idx) =>{
                    return  <ButtonGroup buttonType="singleSetButton" 
                    day = {idx+1} sourceID={[props.currentCycle, idx]} 
                    handleDragging = {props.handleDragging} 
                    onClickHandler={props.handleSetClick} 
                    editing={props.editing} 
                    singleDayExercises={day.Sets}
                    key = {props.currentCycle+idx+uuidv4()}/>}) 
                }
        </div>
    </div>
    )
}

export default CycleWindow