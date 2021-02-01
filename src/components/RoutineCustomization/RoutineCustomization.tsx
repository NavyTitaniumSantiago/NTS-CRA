import React from 'react'
import './RoutineCustomization.css'
import {IRoutine, IRoutineDay, IRoutineSet, IRoutineCycle} from '../interfaces.js'
import ButtonGroup from './buttonGroup'
import {CRoutine, CRoutineSet} from '../functionClasses/routineClasses'
import { v4 as uuidv4 } from 'uuid'
import {LocalStorageProcessor} from '../functionClasses/localStorage'
import {a} from '../functionClasses/editRoutineClasses'
interface IRoutineState{
    currentLocation: string;
    currentRoutine: IRoutine;
    currentCycle: number;
    cart: Array<IRoutineSet>,
    editing: boolean,
    LocalStorageProcessor
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
            LocalStorageProcessor: new LocalStorageProcessor()
        }
    }
    //passThroughCycle critical layout: [].Sets[]
    passThroughCycle:Array<IRoutineDay> = [new CRoutine()] // i wanted this to be off-state to edit it directly, without setState use. I don't remember why i wanted that.
    //editedRoutine critical layout: [].Days[].Sets[] & [].Length(typescript checks will fail if .Length is ommited)
    editedRoutine:Array<IRoutineCycle> = []
    
    componentDidMount(){
        if(this.props.history && this.props.history.location && this.props.history.location.state){
            this.passThroughCycle = JSON.parse(JSON.stringify(this.props.history.location.state.currentRoutine.Cycles[this.state.currentCycle].Days))
            this.setState({currentRoutine: this.props.history.location.state.currentRoutine})
            this.editedRoutine = JSON.parse(JSON.stringify(this.props.history.location.state.currentRoutine.Cycles))
        }
        
    }
    handleSetClick = (event, sourceID?: Array<number>) : void=>{
        event.preventDefault()
        const copyDay = event.target.innerText && event.target.innerText.includes("Day ") && event.ctrlKey && this.state.editing
        const copySet = this.state.editing && event.ctrlKey 
        if(copySet && sourceID){
            if(event.target.parentNode.classList.contains("targetDayID")){
                const copiedSet:CRoutineSet = JSON.parse(JSON.stringify(this.passThroughCycle[sourceID[1]].Sets[sourceID[2]]))  
                this.passThroughCycle[sourceID[1]].Sets.push(copiedSet)       
            }else{
                const copiedSet:CRoutineSet = JSON.parse(JSON.stringify(this.state.cart[sourceID[1]]))
                this.setState({cart:[...this.state.cart, copiedSet]})
            }
           
        }else if(copyDay){
            const copyIdx = parseInt(event.target.innerText.split(' ')[1])-1
            const copiedDay = JSON.parse(JSON.stringify(this.passThroughCycle[copyIdx]))
            this.passThroughCycle.push(copiedDay)
        }
        this.setState({}) 
        this.editedRoutine[this.state.currentCycle].Days = JSON.parse(JSON.stringify(this.passThroughCycle))

    }
    handleDragging = (event:any, sourceID?:Array<number>) : void =>{
        event.stopPropagation()
        
        let newCart = [...this.state.cart]
        /* ---- ACQUIRE DATA FROM ELEMENT THAT IS BEING DRAGGED START ---- */
        if(event.type==="dragstart"){
            let sourceElement: string = "dayrow";
            
            if(event.target.classList.contains("dayButton")){
                sourceElement = "dayButton"
                sourceID = event.target.innerText.split(' ')[1]
            }
            else if(event.target.parentNode.parentNode.classList.contains("sourceCart")) sourceElement = "cart"
            event.dataTransfer.setData("id", sourceID) //String[CycleId, DayId, SetId], can only be used if sourced from Day.
            event.dataTransfer.setData("idByName", event.target.innerText) //backup id if source === cart
            event.dataTransfer.setData("sourceElement", sourceElement)// source = cart or dayrow
        /* ---- ACQUIRE DATA FROM ELEMENT THAT IS BEING DRAGGED START ---- */
        /* ---- PROCESS DROP OFF START ---- */
        }else if(event.type==="drop"){
            const id: Array<string>= event.dataTransfer.getData("id").split(',')
            //const idByName: string = event.dataTransfer.getData("idByName")
            const sourceElement: string = event.dataTransfer.getData("sourceElement")

            let dragTargetIsCart: boolean = false;
            let dragTargetIsDayRow: boolean = false;

            if(event.target.classList.contains("targetDay")|| //Target is rest day
            event.target.parentNode.classList.contains("targetDay")|| //target is a non-empty DayRow
            event.target.parentNode.classList.contains("targetDayID")||
            event.target.classList.contains("dayButton"))  //Target is a button/exercise inside of a DayRow
            {dragTargetIsDayRow = true;}
            else if(event.target.classList.contains("targetCart")|| //when dragging to the cart element that is not covered by instruction text
               event.target.classList.contains("buttonGroup-instruction-text")||//when dragging to the cart element covered by instruction text
               event.target.parentNode.parentNode.classList.contains("targetCart")) //when dragging on top of an exercises/set that is already in cart
               { dragTargetIsCart = true; }

            if(dragTargetIsCart)
            {   let targetValue: IRoutineSet | Array<IRoutineSet>
                if(sourceElement==="dayButton"){
                    targetValue = []
                    const sourceDay = parseInt(id[0])-1
                    this.passThroughCycle[sourceDay].Sets.forEach((set:IRoutineSet) => targetValue.push(set))
                    this.passThroughCycle = this.passThroughCycle.filter((day, idx) =>idx!==sourceDay)
                    newCart=[...newCart, ...targetValue]
                }else{
                    targetValue = this.passThroughCycle[id[1]].Sets[id[2]]
                    this.passThroughCycle[id[1]].Sets = this.passThroughCycle[id[1]].Sets.filter((item, idx)=> idx!==parseInt(id[2]))
                    newCart = [...newCart, targetValue]
                }
            }
            else if(dragTargetIsDayRow)
            {   let targetDayID: number = -1
                let targetButtonMidPoint = 0
                let draggedObject: IRoutineSet
                const target = event.target
                
                //gets the location of the target element
                //we then compare it to our mouse location
                //so that the user can choose whether to drop off order(before/after) target exercise/button
                const {x, width, y, height} = event.target.getClientRects()[0] 

                //If we're dragging to an empty row, "Rest day"
                if(target.classList.contains("targetDayID"))
                {targetDayID = parseInt(target.classList.item(target.classList.length-1))}
                
                //If we're dragging to non empty day, emtpy space
                else if(target.firstChild && target.firstChild.classList && target.firstChild.classList.contains("targetDayID"))
                
                {targetDayID = parseInt(target.firstChild.classList.item(target.firstChild.classList.length-1))}
                //Check for non empty day, dragging on top of existing button/exercise.
                else if(target.parentNode && target.parentNode.classList.contains("targetDayID"))
                {   targetButtonMidPoint = x+width/2 
                    targetDayID = parseInt(target.parentNode.classList.item(target.parentNode.classList.length-1))}
                if(sourceElement==="dayButton"){
                    const moveTo = event.target.innerText.split(' ')[1]-1
                    const moveFrom = parseInt(id[0])-1
                    const DraggedDay = JSON.parse(JSON.stringify(this.passThroughCycle[moveFrom]))
                    targetButtonMidPoint = y+height/2
                    event.pageY>targetButtonMidPoint ? 
                    this.passThroughCycle.splice(moveTo+1, 0, DraggedDay) :
                    this.passThroughCycle.splice(moveTo, 0, DraggedDay)
                    moveFrom>moveTo?this.passThroughCycle.splice(moveFrom+1, 1) :this.passThroughCycle.splice(moveFrom, 1) 
                }
                else if(sourceElement==="cart"){
                    newCart = newCart.filter((item, idx) => {
                        if(idx ===parseInt(id[1])) draggedObject = item
                        else return item}) //has to remove a single object only in case there are duplicates
                }
                else if(sourceElement==="dayrow" && !event.target.classList.contains("dayButton")){
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
            
            this.editedRoutine[this.state.currentCycle].Days = JSON.parse(JSON.stringify(this.passThroughCycle))
            this.setState({cart:newCart})
        }
    }
    cycleCycles = (event) => {
        event.preventDefault()
        const currentCycle = parseInt(event.target.innerText.split(' ')[1])-1
        this.setState({currentCycle:currentCycle})
        this.passThroughCycle = JSON.parse(JSON.stringify(this.editedRoutine[currentCycle].Days))
    }

    toggleEdit = (event) =>{
        event.preventDefault()
        if(event.target.innerText==="Save"){
            const newRoutine: IRoutine = {...this.state.currentRoutine}
            newRoutine.Cycles.map((cycle, idx) =>{
                return {Length:this.editedRoutine[idx].length, Days:this.editedRoutine[idx]}
            })
            console.log(newRoutine)
            this.setState({editing: !this.state.editing, currentRoutine: newRoutine, cart: []})
        }else if(event.target.innerText==="Edit"){
            this.setState({editing: !this.state.editing})
        }else if(event.target.innerText==="Cancel"){
            this.passThroughCycle = JSON.parse(JSON.stringify(this.state.currentRoutine.Cycles[this.state.currentCycle].Days))
            this.editedRoutine = JSON.parse(JSON.stringify(this.state.currentRoutine.Cycles))
            this.setState({editing: !this.state.editing, cart: []})
        }
    }
    
    saveRoutineToLocalStorage = () =>{
        console.log(this.state.LocalStorageProcessor.saveRoutine(this.state.currentRoutine))
    }
    render(){
        let cartStyle="row mb-3 ms-3 me-3 mt-0 cart-On-RoutineCustomization slideDown";
        let editingAreaStyle = "row ms-3 text-left fs-4 slideDown"
        const settingsButtonsStyle = "ms-5 cycleButton-Shadow rounded-0 w-25 btn btn-primary"
        let {editing, cart, currentRoutine, currentCycle} = this.state
        return(
            <div className = "container-fluid p-2">
                {/* ----EDIT AREA ELEMENT START---- */}
                {editing ? (<div className={editingAreaStyle}>Editing Area:
                            <div className = {cartStyle} id="holdingArea" onDragOver={(e)=>{e.preventDefault()}} onDragEnter={(e)=>{e.preventDefault()}} onDrop={this.handleDragging}>
                                <ButtonGroup buttonType="cartButton" handleDragging={this.handleDragging} 
                                cart = {cart} editing={editing} sourceID={[currentCycle]} onClickHandler = {this.handleSetClick}/>
                            </div></div>

                ):(null)}

                {/* ----EDIT AREA ELEMENT END---- */}
                {/* ----CYCLE TAB ELEMENT START---- */}
                <ButtonGroup buttonType="cycleNavigationButton" cycleNum={currentRoutine["Number of Cycles"]} currentCycle={currentCycle} onClickHandler={this.cycleCycles}/>
                {/* ----CYCLE TAB ELEMENT END---- */}
                {/* ----ROUTINE VIEW ELEMENT START---- */}
                <div className = "row" id="routineDisplayArea">
                    <div className = "col col-sm-12 ps-0">
                            {this.passThroughCycle && this.passThroughCycle.map((day, idx) =>{
                                return  <ButtonGroup buttonType="singleSetButton" 
                                day = {idx+1} sourceID={[currentCycle, idx]} 
                                handleDragging = {this.handleDragging} 
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
                    <div className="col col-sm-9">
                        <button type="button" className={settingsButtonsStyle}>Set Schedule</button>
                        <button type="button" className={settingsButtonsStyle} onClick={this.toggleEdit}>{this.state.editing?(`Save`):(`Edit`)}</button>
                        {this.state.editing ? 
                        (<button type="button" className='ms-5 cancel_finalizeButton-RoutineCustomization rounded-0 w-25 btn' onClick={this.toggleEdit}>Cancel</button>)
                        :
                        (<button type="button" className='ms-5 cancel_finalizeButton-RoutineCustomization rounded-0 w-25 btn' onClick={this.saveRoutineToLocalStorage}>Finalize Routine</button>)}
                    </div>
                </div>
                {/* ----SETTINGS BUTTONS ELEMENT END---- */}
            </div>
        )
    }
}


export default RoutineCustomization