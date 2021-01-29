import React from 'react'
import './RoutineCustomization.css'
import {IRoutine, IRoutineDay, IRoutineSet} from '../interfaces.js'
import ButtonGroup from './buttonGroup'
import {CRoutine, CRoutineDay, CRoutineSet} from '../functionClasses/routineClasses'

interface IRoutineState{
    currentLocation: string;
    currentRoutine: IRoutine;
    currentCycle: number;
    cart: Array<IRoutineSet>,
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
    passThroughCycle:Array<IRoutineDay> = [new CRoutineDay()]
    
    componentDidMount(){
        if(this.props.history && this.props.history.location && this.props.history.location.state){
            this.passThroughCycle = [...this.props.history.location.state.currentRoutine.Cycles[this.state.currentCycle].Days]
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
        event.stopPropagation()
        let newCart = [...this.state.cart]
        console.log("newCart1", newCart)
        if(event.type==="dragstart"){
            event.dataTransfer.setData("id", sourceID)
            event.dataTransfer.setData("idByName", event.target.innerText)
        }else if(event.type==="drop"){
            console.error("Event in handlecart-drop", event)
            const id = event.dataTransfer.getData("id").split(',')
            const idByName = event.dataTransfer.getData("idByName")
            console.error("SourceID in handleCart", id, idByName)
            console.log(1514, event)
            const eventClass = event.target.classList

            if(eventClass.contains("editCart")|eventClass.contains("buttonGroup-instruction-text")|event.target.parentNode.parentNode.classList.contains("editCart")){
                const targetValue = this.state.currentRoutine.Cycles[id[0]].Days[id[1]].Sets[id[2]]
                console.log(1517,  this.passThroughCycle)
                this.passThroughCycle[id[1]].Sets.forEach(item=>console.log(1519, item))
                this.passThroughCycle[id[1]].Sets = this.passThroughCycle[id[1]].Sets.filter((item, idx)=> idx!==parseInt(id[2]))
                console.log(1518,  this.passThroughCycle)
                //this.setState({cart:[...this.state.cart, targetValue]})
                newCart = [...newCart, targetValue]
            }else if(eventClass.contains("editDay")){
                console.error(1516)
                newCart = this.state.cart.filter((item)=> item.Exercise !== idByName)
                //this.setState({cart:newCart})
            }
            console.log("newCart", newCart)
            this.setState({cart:newCart})
            console.log("Cart", this.state)
        }
    }
    cycleCycles = (event) => {
        event.preventDefault()
        const currentCycle = parseInt(event.target.innerText.split(' ')[1])-1
        this.setState({currentCycle:currentCycle})
        this.passThroughCycle = this.state.currentRoutine.Cycles[currentCycle].Days
    }
    toggleEdit = (event) =>{
        event.preventDefault()
        this.setState({editing: !this.state.editing})
    }

    render(){
        let cartStyle = "row mb-3 mr-0 "
        const settingsButtonsStyle = "ms-5 cycleButton-Shadow rounded-0 w-25 btn btn-primary"
        let {editing, cart, currentRoutine, currentCycle} = this.state
        // let passThroughCycle = currentRoutine[currentCycle].Days
        //console.log(this.passThroughCycle)
        if(editing) cartStyle="row mb-3 ms-3 me-3 mt-0 cart-On-RoutineCustomization droppable"
        return(
            <div className = "container-fluid p-2">
                {/* ----EDIT AREA ELEMENT START---- */}
                {editing ? (<div className="row ms-3 text-left fs-4">Editing Area:</div>):(null)}
                <div className = {cartStyle} id="holdingArea" onDragOver={(e)=>{e.preventDefault()}} onDragEnter={(e)=>{e.preventDefault()}} onDrop={this.handleCart}>
                    <ButtonGroup buttonType="cartButton" handleDragging={this.handleCart} 
                    cart = {cart} editing={editing} sourceID={[currentCycle]}/>
                </div>
                {/* ----EDIT AREA ELEMENT END---- */}
                {/* ----CYCLE TAB ELEMENT START---- */}
                <ButtonGroup buttonType="cycleNavigationButton" cycleNum={currentRoutine["Number of Cycles"]} currentCycle={currentCycle} onClickHandler={this.cycleCycles}/>
                {/* ----CYCLE TAB ELEMENT END---- */}
                {/* ----ROUTINE VIEW ELEMENT START---- */}
                <div className = "row" id="routineDisplayArea">
                    <div className = "col col-sm-12 ps-0">
                            {this.passThroughCycle.map((day, idx) =>{
                                return  <ButtonGroup buttonType="singleSetButton" 
                                day = {idx+1} sourceID={[currentCycle, idx]} 
                                handleDragging = {this.handleCart} 
                                onClickHandler={this.handleSetClick} 
                                editing={editing} 
                                singleDayExercises={day.Sets}
                                key = {"routineName"+currentCycle+idx}/>}) //replace routineName to read from state when you fix the routine json object.
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