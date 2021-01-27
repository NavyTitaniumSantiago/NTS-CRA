import React from 'react'
import './RoutineCustomization.css'
import {IRoutine} from '../interfaces.js'
import ButtonGroup from './buttonGroup'
import { isThisTypeNode } from 'typescript'

interface IRoutineState{
    currentLocation: string;
    currentRoutine: IRoutine;
    currentCycle: number;
    cart: Array<string>,
}

class RoutineCustomization extends React.Component<any, IRoutineState>{
    constructor(props:any){
        super(props)
        this.state = {
            currentLocation: 'routineCustomizationFrame',
            currentRoutine: this.props.history.location.state.currentRoutine,
            currentCycle: 0,
            cart: []
        }
    }

    cycleCycles = (event) => {
        event.preventDefault()
        console.log(123, event)
        this.setState({currentCycle:parseInt(event.target.innerText.split(' ')[1])-1})
    }

    render(){
        return(
            <div className = "container-fluid p-2">
                <div className = "row mb-3 mr-0" id="holdingArea">
                    <ButtonGroup cart = {this.state.cart}/>
                </div>
                <div className = "row" id="cycleTabs">
                     <ButtonGroup cycleNum={this.state.currentRoutine["Number of Cycles"]} onClickHandler={this.cycleCycles}/>
                </div>
                <div className = "row" id="routineDisplayArea">
                    {/* <div className = "col col-sm-1">
                        <ButtonGroup  vertical={true} cycleItem={propCycle.Days}/>
                    </div> */}
                    <div className = "col col-sm-12 ps-0">
                            {this.state.currentRoutine.Cycles[this.state.currentCycle].Days.map((day, idx) =>{
                                return  <ButtonGroup day = {idx+1} cycleItem={day.Sets} key = {"routineName"+this.state.currentCycle+idx}/>}) //replace routineName to read from state when you fix the routine json object.
                            }
                    </div>
                </div>
                <div className = "row" id="changeSettingsArea">
                </div>
            </div>
        )
    }
}


export default RoutineCustomization