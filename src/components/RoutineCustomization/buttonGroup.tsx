import React from 'react'
import {IRoutineDay, IRoutineSet} from '../interfaces.js'
import Button from './button'
import { v4 as uuidv4 } from 'uuid'

interface IButtonGroupProps{
    singleDayExercises?: Array<IRoutineDay>
    cycleLength?: number 
    cart?:Array<IRoutineSet>
    day?: number
    cycleNum?: number
    currentCycle?: number
    editing?: boolean
    buttonType: string;
    onClickHandler?: (event: React.MouseEvent<HTMLButtonElement>, sourceID?: Array<number>) => void
    sourceID?: Array<number>
    handleDragging?: (event: any, sourceID?: Array<number>) => void
}
const ButtonGroup: React.FC<IButtonGroupProps> = props =>{
    /* ---- DECLARING VARIABLES START ----*/

    //instructions text for edit area
    const instructionsText = ["-- Drag items here to move them between cycles or drag them directly to a different day.", <br/>,"-- Alternatively you can edit the sets by directly clicking on them.", <br/>, "-- Ctrl-Click on a set to duplicate"]
    //default buttonGroupStyle applies to exercise list and edit area
    let buttonGroupStyle = "btn-group pe-auto float-start btn-grp-routineCustomization"
    //buttonElements -> default buttonElements is for exercise list, the secondary is for cycle-tab-navigation
    let buttonElements = props.singleDayExercises;
    let buttonText = ''
    let rowClass = "row dayRow me-0 ms-2"
    let keyValue = '' //keyvalue is react element key
    let onClickFunc: (event: React.MouseEvent<HTMLButtonElement>, sourceID?: Array<number>) => void =(event) => event.preventDefault()
    let handleDragging: (event: any, sourceID?: Array<number>) => void =(event) => event.preventDefault()
    let renderDOTW = true;
    let renderRestDay = false;
    let renderStartButton = false;
    let renderEditingInstructions = false;
    let singleRow = "col col-sm-10 sourceDay targetDay"
    /* ---- DECLARING VARIABLES END ----*/
    /* ---- INITIALISING VARIABLES START ---- */

    if(props.onClickHandler) onClickFunc = props.onClickHandler
    if(props.handleDragging) handleDragging = props.handleDragging

    switch(props.buttonType){
        case "cartButton":
            singleRow = "col col-sm-12 targetCart sourceCart pt-2 pb-2"
            buttonElements = props.cart
            rowClass = "row dayRow me-0 ms-0 targetCart sourceCart"
            renderDOTW = false;
            if(props.cart && !props.cart.length && props.editing) renderEditingInstructions = true;
            break;
        case "cycleNavigationButton":
            buttonElements = new Array(props.cycleNum).fill(1)
            buttonGroupStyle = "btn-group float-start"
            renderDOTW = false;
            break;
        case "singleSetButton":
            if(props.singleDayExercises && !props.singleDayExercises.length) renderRestDay = true
            buttonGroupStyle = `btn-group pe-auto float-start targetDayID ${props.sourceID && props.sourceID[1]}`
            renderStartButton = !renderRestDay
            break;
        default:
            
            break;
    }

    /* ---- INITIALISING VARIABLES END ---- */

    return(
        <div className = {rowClass}>
            {/* ----DAY# BUTTON START---- */}
            {(renderDOTW)  ? (<div className="col col-sm-1 p-0"><Button onClickFunc={onClickFunc} handleDragging = {handleDragging} buttonText = {`Day ${props.day}`} editing={props.editing}/></div>)
                : (null)}
            {/* ----DAY# BUTTON END---- */}
            {/* ----HORIZONTAL LISTS GENERATOR START---- */}
            <div className = {singleRow} onDragOver={(e)=>{e.preventDefault()}} onDragEnter={(e)=>{e.preventDefault()}} onDrop={props.handleDragging}>
                {(renderRestDay) ? (<div className={`fw-bold fs-1 targetDayID ${props.sourceID && props.sourceID[1]}`}>REST DAY</div>):(
                <div className={buttonGroupStyle} role="group" aria-label="">
                    {renderEditingInstructions?(<div className="buttonGroup-instruction-text">{instructionsText}</div>):(null)}
                    {buttonElements && buttonElements.map((cyclingEle, idx)=>{
                        let sourceID:Array<number> = []
                        if(props.sourceID) sourceID=[...props.sourceID]
                        // ----EXERCISE LISTS GENERATOR START----
                        if(cyclingEle && cyclingEle.Exercise){
                            buttonText = cyclingEle.Exercise
                            keyValue = uuidv4()+cyclingEle.Exercise+idx
                            sourceID.push(idx)
                        }
                        // ----CYCLE TAB NAVIGATION GENERATOR START---- 
                        else if(props.cycleNum){
                            keyValue = uuidv4()+"cycleNum"+cyclingEle+idx
                            buttonText = "Cycle " + (idx+1)
                        }
                        return <Button handleDragging = {handleDragging} sourceID={sourceID} buttonText = {buttonText} key={keyValue} onClickFunc = {onClickFunc} active={props.currentCycle} editing={props.editing}/>
                    })}
                </div>)}
            </div>
            {/* ----HORIZONTAL LISTS GENERATOR END---- */}
            {(renderStartButton)  ? (<div className="col col-sm-1 p-0"><Button onClickFunc={onClickFunc} buttonText = {"START"} handleDragging = {handleDragging}/></div>)
                : (null)}
        </div>
    )
}

export default ButtonGroup