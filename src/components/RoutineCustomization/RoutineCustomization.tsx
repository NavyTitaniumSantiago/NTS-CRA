import React from 'react'
import './RoutineCustomization.css'
import {IRoutine, IRoutineDay, IRoutineSet} from '../interfaces.js'
import ButtonGroup from './buttonGroup'
import {CRoutine, CRoutineDay, CRoutineSet} from '../functionClasses/routineClasses'
import { v4 as uuidv4 } from 'uuid'
import { Z_FILTERED } from 'zlib'

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
            this.passThroughCycle = JSON.parse(JSON.stringify(this.props.history.location.state.currentRoutine.Cycles[this.state.currentCycle].Days))
            this.setState({currentRoutine: this.props.history.location.state.currentRoutine})
        }
        
    }
    handleSetClick = (event) =>{
        event.preventDefault()
    }
    handleCart = (event:any, sourceID?:Array<number>) =>{
        event.stopPropagation()
        console.log(1523, event)
        let newCart = [...this.state.cart]
        /* ---- ACQUIRE DATA FROM ELEMENT THAT IS BEING DRAGGED START ---- */
        if(event.type==="dragstart"){
            let source: string = "dayrow";
            if(event.target.parentNode.parentNode.classList.contains("sourceCart")) source = "cart"
            event.dataTransfer.setData("id", sourceID) //String[CycleId, DayId, SetId], can only be used if sourced from Day.
            event.dataTransfer.setData("idByName", event.target.innerText) //backup id if source === cart
            event.dataTransfer.setData("sourceElement", source)// source = cart or dayrow
            console.log(event.pageX, event.pageY)
        /* ---- ACQUIRE DATA FROM ELEMENT THAT IS BEING DRAGGED START ---- */
        /* ---- PROCESS DROP OFF START ---- */
        }else if(event.type==="drop"){
            const id = event.dataTransfer.getData("id").split(',')
            const idByName = event.dataTransfer.getData("idByName")
            const sourceElement = event.dataTransfer.getData("sourceElement")

            let dragTargetIsCart: boolean = false;
            let dragTargetIsDayRow: boolean = false;

            if(event.target.classList.contains("targetDay")| //Target is rest day
            event.target.parentNode.classList.contains("targetDay") //target is a non-empty DayRow
            |event.target.parentNode.classList.contains("targetDayID"))  //Target is a button/exercise inside of a DayRow
            {dragTargetIsDayRow = true;}
            else if(event.target.classList.contains("targetCart")| //when dragging to the cart element that is not covered by instruction text
               event.target.classList.contains("buttonGroup-instruction-text")|//when dragging to the cart element covered by instruction text
               event.target.parentNode.parentNode.classList.contains("targetCart"))//when dragging on top of an exercises/set that is already in cart
               { dragTargetIsCart = true; }

            if(dragTargetIsCart)
            {   const targetValue = this.passThroughCycle[id[1]].Sets[id[2]]
                this.passThroughCycle[id[1]].Sets = this.passThroughCycle[id[1]].Sets.filter((item, idx)=> idx!==parseInt(id[2]))
                newCart = [...newCart, targetValue]
            }
            else if(dragTargetIsDayRow)
            {   let targetDayID: number = -1
                let targetButtonMidPoint = 0
                let draggedObject: IRoutineSet
                const target = event.target
                
                if(target.classList.contains("targetDayID"))//Check for "Rest day"
                {targetDayID = parseInt(target.classList.item(target.classList.length-1))}
                else if(target.firstChild && target.firstChild.classList && target.firstChild.classList.contains("targetDayID"))
                //Check for non empty day, emtpy space
                {targetDayID = parseInt(target.firstChild.classList.item(target.firstChild.classList.length-1))}
                else if(target.parentNode && target.parentNode.classList.contains("targetDayID"))
                //Check for non empty day, dragging on top of existing button/exercise.
                {   const {x, width} = event.target.getClientRects()[0] 
                    //gets our mouse location when we drop off
                    //so that the user can choose whether to drop off order(before/after) target exercise/button
                    targetButtonMidPoint = x+width/2
                    targetDayID = parseInt(target.parentNode.classList.item(target.parentNode.classList.length-1))}
                if(sourceElement==="cart"){
                    newCart = []
                    const currentCart = this.state.cart
                    for(let i = 0; i<currentCart.length; i++){ //has to remove a single object only in case there are duplicates
                        if(currentCart[i].Exercise === idByName) draggedObject = currentCart[i]
                        else{newCart.push(currentCart[i])}
                    }    
                }
                else if(sourceElement==="dayrow"){
                    draggedObject = this.passThroughCycle[id[1]].Sets[id[2]]
                    this.passThroughCycle[id[1]].Sets = this.passThroughCycle[id[1]].Sets.filter((item, idx)=> idx!==parseInt(id[2]))
                }
                if(targetDayID!==-1 && draggedObject){
                    if(!targetButtonMidPoint) //only used when the row we're dragging to is not empty
                    {this.passThroughCycle[targetDayID].Sets.push(draggedObject)}
                    else{//siblings need to be used because a day can have multiple sets of the same exercise
                        const siblingList = event.target.parentNode.children
                        for(let i = 0; i<siblingList.length; i++){
                            if(siblingList[i] === event.target){ 
                                event.pageX>targetButtonMidPoint ?
                                this.passThroughCycle[targetDayID].Sets.splice(i+1, 0, draggedObject) :
                                this.passThroughCycle[targetDayID].Sets.splice(i, 0, draggedObject)
                                break;
                            }
                        }
                    }
                }
            }
            
            /* ---- PROCESS DROP OFF END ---- */

            this.setState({cart:newCart})
      
        }
        
    }
    cycleCycles = (event) => {
        event.preventDefault()
        const currentCycle = parseInt(event.target.innerText.split(' ')[1])-1
        this.setState({currentCycle:currentCycle})
        this.passThroughCycle = JSON.parse(JSON.stringify(this.state.currentRoutine.Cycles[currentCycle].Days))
        //this.passThroughCycle = [...this.state.currentRoutine.Cycles[currentCycle].Days]
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
        if(editing) cartStyle="row mb-3 ms-3 me-3 mt-0 cart-On-RoutineCustomization"
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
                                key = {currentCycle+idx+uuidv4()}/>}) 
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