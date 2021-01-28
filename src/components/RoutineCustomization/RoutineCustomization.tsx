import React from 'react'
import './RoutineCustomization.css'
import {IRoutine} from '../interfaces.js'
import ButtonGroup from './buttonGroup'
import {CRoutine} from '../functionClasses/routineClasses'

interface IRoutineState{
    currentLocation: string;
    currentRoutine: IRoutine;
    currentCycle: number;
    cart: Array<string>,
    editing: boolean,
}

class RoutineCustomization extends React.Component<any, IRoutineState>{
    constructor(props:any){
        super(props)
        this.state = {
            currentLocation: 'routineCustomizationFrame',
            currentRoutine: new CRoutine(),
            currentCycle: 0,
            cart: [],
            editing: false,
        }
    }
    componentDidMount(){
        if(this.props.history && this.props.history.location && this.props.history.location.state){
            this.setState({currentRoutine: this.props.history.location.state.currentRoutine})
        }
    }
    handleSetClick = (event) =>{
        event.preventDefault()
        console.log(67, event)
        console.log(12, event.type)
    }
    cycleCycles = (event) => {
        event.preventDefault()
        this.setState({currentCycle:parseInt(event.target.innerText.split(' ')[1])-1})
    }
    toggleEdit = (event) =>{
        event.preventDefault()
        this.setState({editing: !this.state.editing})
    }

    render(){
        let cartStyle = "row mb-3 mr-0"
        if(this.state.editing) cartStyle="row mb-3 ms-3 me-3 mt-0 cart-On-RoutineCustomization"
        return(
            <div className = "container-fluid p-2">
                {this.state.editing ? (<div className="row ms-3 text-left fs-4">Editing Area:</div>):(null)}
                <div className = {cartStyle} id="holdingArea" >
                    <ButtonGroup cart = {this.state.cart} editing={this.state.editing}/>
                </div>
                {this.state.currentRoutine &&
                     <ButtonGroup cycleNum={this.state.currentRoutine["Number of Cycles"]} currentCycle={this.state.currentCycle} onClickHandler={this.cycleCycles}/>
                }
                <div className = "row" id="routineDisplayArea">
                    {/* <div className = "col col-sm-1">
                        <ButtonGroup  vertical={true} cycleItem={propCycle.Days}/>
                    </div> */}
                    <div className = "col col-sm-12 ps-0">
                            {this.state.currentRoutine.Cycles[this.state.currentCycle].Days.map((day, idx) =>{
                                return  <ButtonGroup day = {idx+1} onClickHandler={this.handleSetClick} editing={this.state.editing} cycleItem={day.Sets} key = {"routineName"+this.state.currentCycle+idx}/>}) //replace routineName to read from state when you fix the routine json object.
                            }
                    </div>
                </div>
                <div className = "row mt-4" id="changeSettingsArea">
                    <div className="col col-sm-6">
                        <button type="button" className="ms-5 cycleButton-Shadow rounded-0 w-25 btn btn-primary">Set Schedule</button>
                        <button type="button" className="ms-5 cycleButton-Shadow rounded-0 w-25 btn btn-primary" onClick={this.toggleEdit}>Edit</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default RoutineCustomization