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
    }
    handleCart = (event:any, sourceID?:Array<number>) =>{
        //event.preventDefault()
        //console.log(sourceID)
        //console.log("dargevent", event.type)
        if(event.type==="dragstart"){
            event.dataTransfer.setData("id", sourceID)
        }else if(event.type==="drop"){
            const id = event.dataTransfer.getData("id").split(',')
            console.log("drop", event)
            const targetValue = this.state.currentRoutine.Cycles[id[0]].Days[id[1]].Sets[id[2]]
            const newRoutine = this.state.currentRoutine
            delete newRoutine.Cycles[id[0]].Days[id[1]].Sets[id[2]]
            //console.log(this.state.currentRoutine.Cycles[id[0]].Days[id[1]].Sets[id[2]])
            this.setState({cart:[...this.state.cart, targetValue], currentRoutine: newRoutine})
        }
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
        let cartStyle = "row mb-3 mr-0 "
        const settingsButtonsStyle = "ms-5 cycleButton-Shadow rounded-0 w-25 btn btn-primary"
        let {editing, cart, currentRoutine, currentCycle} = this.state
        if(editing) cartStyle="row mb-3 ms-3 me-3 mt-0 cart-On-RoutineCustomization droppable"
        return(
            <div className = "container-fluid p-2">
                {/* ----EDIT AREA ELEMENT START---- */}
                {editing ? (<div className="row ms-3 text-left fs-4">Editing Area:</div>):(null)}
                <div className = {cartStyle} id="holdingArea" onDragOver={(e)=>{e.preventDefault()}} onDragEnter={(e)=>{e.preventDefault()}} onDrop={this.handleCart}>
                    <ButtonGroup handleDragging={this.handleCart} cart = {cart} editing={editing}/>
                </div>
                {/* ----EDIT AREA ELEMENT END---- */}
                {/* ----CYCLE TAB ELEMENT START---- */}
                <ButtonGroup cycleNum={currentRoutine["Number of Cycles"]} currentCycle={currentCycle} onClickHandler={this.cycleCycles}/>
                {/* ----CYCLE TAB ELEMENT END---- */}
                {/* ----ROUTINE VIEW ELEMENT START---- */}
                <div className = "row" id="routineDisplayArea">
                    <div className = "col col-sm-12 ps-0">
                            {currentRoutine.Cycles[currentCycle].Days.map((day, idx) =>{
                                return  <ButtonGroup day = {idx+1} sourceID={[currentCycle, idx]} handleDragging = {this.handleCart} onClickHandler={this.handleSetClick} editing={editing} cycleItem={day.Sets} key = {"routineName"+currentCycle+idx}/>}) //replace routineName to read from state when you fix the routine json object.
                            }
                    </div>
                </div>
                {/* ----ROUTINE VIEW END---- */}
                {/* ----SETTINGS BUTTONS ELEMENT START---- */}
                <div className = "row mt-4" id="changeSettingsArea">
                    <div className="col col-sm-6">
                        <button type="button" className={settingsButtonsStyle}>Set Schedule</button>
                        <button type="button" className={settingsButtonsStyle} onClick={this.toggleEdit}>Edit</button>
                    </div>
                </div>
                {/* ----SETTINGS BUTTONS ELEMENT END---- */}
            </div>
        )
    }
}


export default RoutineCustomization