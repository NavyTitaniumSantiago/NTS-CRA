import React from 'react'
import {IRoutineDay, IRoutineSet} from '../interfaces.js'
import ButtonGroup from './buttonGroup'
import Button from './button'
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
        {/* <div className = "row ps-4">
            <div className = "col col-sm-1 p-0">
            <Button
                    buttonText={"Day +"} sourceID={[props.currentCycle, -2]} 
                    handleDragging = {props.handleDragging} 
                    onClickFunc={props.handleSetClick} 
                    editing={props.editing} 
                    key = {props.currentCycle+uuidv4()}/>
            </div>
        </div> */}
    </div>
    )
}

export default CycleWindow