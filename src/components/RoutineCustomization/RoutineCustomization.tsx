import React from 'react'
import './RoutineCustomization.css'
import {IRoutine, IRoutineDay, IRoutineSet, IRoutineCycle} from '../interfaces.js'
import ButtonGroup from './buttonGroup'
import {CRoutine, CRoutineCycle, CRoutineSet, CRoutineDay} from '../functionClasses/routineClasses/routineClasses'
import {LocalStorageProcessor} from '../functionClasses/localStorage'
import CycleWindow from './cycleWindow'

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
    passThroughCycle: CRoutineCycle = new CRoutineCycle() // to edit directly with class methods
    //editedRoutine critical layout: [].Days[].Sets[] & [].Length(typescript checks will fail if .Length is ommited)
    editedRoutine: CRoutine = new CRoutine()
    
    componentDidMount(){
        if(this.props.history && this.props.history.location && this.props.history.location.state){
            this.passThroughCycle = new CRoutineCycle(this.props.history.location.state.currentRoutine.Cycles[this.state.currentCycle])
            this.setState({currentRoutine: this.props.history.location.state.currentRoutine})
            this.editedRoutine = new CRoutine(this.props.history.location.state.currentRoutine)
        }
        
    }
    handleSetClick = (event, sourceID?: Array<number>) : void=>{
        event.preventDefault()
        if(!this.state.editing) return
        const targetIsDay = event.target.innerText && event.target.innerText.includes("Day ")
        if(event.ctrlKey){
            if(targetIsDay){
                const copyIdx = parseInt(event.target.innerText.split(' ')[1])-1
                this.passThroughCycle.duplicate(copyIdx)
            }
            else if(sourceID){
                if(event.target.parentNode.classList.contains("targetDayID")){
                    this.passThroughCycle.Days[sourceID[1]].duplicate(sourceID[2])    
                }else{
                const copiedSet:IRoutineSet = JSON.parse(JSON.stringify(this.state.cart[sourceID[2]]))
                this.setState({cart:[...this.state.cart, copiedSet]})
                }
            }
            this.setState({}) 
            this.editedRoutine.Cycles[this.state.currentCycle] = this.passThroughCycle.copy()
        }else if(event.altKey){
            if(targetIsDay){
                const delIdx = parseInt(event.target.innerText.split(' ')[1])-1
                this.passThroughCycle.remove(delIdx)
            }
            else if(sourceID){
                if(event.target.parentNode.classList.contains("targetDayID")){
                    this.passThroughCycle.Days[sourceID[1]].remove(sourceID[2])
                }else{
                    const newCartWithMethods = new CRoutineDay()
                    newCartWithMethods.setSets(this.state.cart)
                    newCartWithMethods.remove(sourceID[2])
                    this.setState({cart:newCartWithMethods.Sets})
                }
            }
            
            if(this.passThroughCycle.Days.length === 0){
                this.editedRoutine.removeCycle(this.state.currentCycle)
            }else{
                this.editedRoutine.Cycles[this.state.currentCycle] = this.passThroughCycle.copy()
            }
            this.setState({})
        }
    }

    handleDragging = (event:any, sourceID?:Array<number>) : void =>{
        event.stopPropagation()
        const target = event.target
        let newCart = [...this.state.cart]
        /* ---- ACQUIRE DATA FROM ELEMENT THAT IS BEING DRAGGED START ---- */
        if(event.type==="dragstart"){
            
            //sourceID = [Cycle, Day, Set]
            //Drags of Set elements will have sID of len 3
            //Drags originating from non-Set elements will have sID of len 2
            //Drags originating from cart will have sID of [-1, -1, Set]
            //sourceID = event.target.innerText.split(' ')[1]
            //event.dataTransfer.setData("id", sourceID) 

            event.dataTransfer.setData("id", sourceID)
            if(event.target.classList.contains("cycleButton")|| //inactive tab
            event.target.classList.contains("cycleButton-Shadow")){ //selected tab
                event.dataTransfer.setData("cycleId", target.innerText.split(' ')[1]-1)
            } 

        /* ---- ACQUIRE DATA FROM ELEMENT THAT IS BEING DRAGGED START ---- */
        /* ---- PROCESS DROP OFF START ---- */
        }else if(event.type==="drop"){
            
            const id: Array<number> = []
            event.dataTransfer.getData("id").split(',').forEach(stringNum => id.push(parseInt(stringNum)))
            let dragTargetIsCart: boolean = false;
            let dragTargetIsDayRow: boolean = false;
            let dragTargetIsCycle: boolean = false;
            let targetButtonMidPoint = 0
            const cycleId = event.dataTransfer.getData("cycleId")
            let moveTo: number = 99
            
            //gets the location of the target element
            //we then compare it to our mouse location
            //so that the user can choose whether to drop off order(before/after) target exercise/button
                
            const {x, width, y, height} = target.getClientRects()[0] 

            if(target.classList.contains("targetDay")|| //Target is rest day
               target.parentNode.classList.contains("targetDay")|| //target is a non-empty DayRow
               target.parentNode.classList.contains("targetDayID")||
               target.classList.contains("dayButton"))  //Target is a button/exercise inside of a DayRow
                {
                    dragTargetIsDayRow = true;
                }
            else if(target.classList.contains("targetCart")|| //when dragging to the cart element that is not covered by instruction text
               target.classList.contains("buttonGroup-instruction-text")||//when dragging to the cart element covered by instruction text
               target.parentNode.parentNode.classList.contains("targetCart")) //when dragging on top of an exercises/set that is already in cart
                { 
                   dragTargetIsCart = true; 
                }
            else if(target.classList.contains("cycleButton"))
                {
                    dragTargetIsCycle = true;
                }

            if(dragTargetIsCart && !cycleId)
            {   let targetValue: IRoutineSet | Array<IRoutineSet>
                if(id[0] === -1){ // dragging within cart
                    if(!target.classList.contains("targetCart")){//dragging on top of an exercise button
                        targetButtonMidPoint = x+width/2
                        const siblingList = target.parentNode.children
                        //siblings need to be used because a day can have multiple sets of the same exercise
                        for(let i = 0; i<siblingList.length; i++){
                            if(siblingList[i] === target){
                                moveTo = i
                                break;
                            }
                        }
                    }
                    else {moveTo = newCart.length-1} //dragging to an emtpy space in the cart
                    const newCartWithMethods = new CRoutineDay()
                    newCartWithMethods.setSets(newCart)
                    newCartWithMethods.move(id[2], moveTo, targetButtonMidPoint, event.pageX)
                    newCart = newCartWithMethods.Sets
                   
                }
                else if(id.length === 2){ //dragging a whole day to cart
                    targetValue = []
                    const sourceDay = id[1]
                    this.passThroughCycle.Days[sourceDay].Sets.forEach((set:IRoutineSet) => targetValue.push(set))
                    this.passThroughCycle.remove(sourceDay)

                    if(!this.passThroughCycle.Days.length){
                        this.editedRoutine.removeCycle(this.state.currentCycle)
                        this.setState({currentCycle: 0})
                    }
                    newCart=[...newCart, ...targetValue]
                }else{ //dragging a single set to cart
                    targetValue = this.passThroughCycle.Days[id[1]].Sets[id[2]]
                    this.passThroughCycle.Days[id[1]].remove(id[2])
                    newCart = [...newCart, targetValue]
                }
            }
            else if(dragTargetIsDayRow)
            {   let targetDayID: number = -1
                let draggedObject: IRoutineSet
                
                //If we're dragging to an empty row, "Rest day"

                if(target.classList.contains("targetDayID")){
                    targetDayID = parseInt(target.classList.item(target.classList.length-1))
                }
                
                //If we're dragging to non empty day, emtpy space

                else if(target.firstChild && target.firstChild.classList && target.firstChild.classList.contains("targetDayID")){
                    targetDayID = parseInt(target.firstChild.classList.item(target.firstChild.classList.length-1))
                }

                //Check for non empty day, dragging on top of existing button/exercise.

                else if(target.parentNode && target.parentNode.classList.contains("targetDayID")){
                    targetButtonMidPoint = x+width/2 
                    targetDayID = parseInt(target.parentNode.classList.item(target.parentNode.classList.length-1))
                }

                //Check for a Day row "Day X" button
                //this only occurs when we drag a single set on to of a "Day X" button

                else if(target.classList.contains("dayButton")){
                    targetDayID = parseInt(event.target.innerText.split(' ')[1])-1
                }

                

                if(targetButtonMidPoint){
                    const siblingList = event.target.parentNode.children
                    //siblings need to be used because a day can have multiple sets of the same exercise
                    for(let i = 0; i<siblingList.length; i++){
                        if(siblingList[i] === event.target){
                            moveTo = i
                            break;
                        }
                    }
                }

                if(id[0]===-1){ //we're dragging item away from cart
                    newCart = newCart.filter((item, idx) => {
                        if(idx === id[2]){
                            this.passThroughCycle.Days[targetDayID].insert(moveTo, item, targetButtonMidPoint, event.pageX)
                        } 
                        else return item}) //has to remove a single object only in case there are duplicates
                }
                else if(id.length === 2){ // we're dragging a whole row
                    
                    const moveFrom = id[1]
                    targetButtonMidPoint = y+height/2
                    this.passThroughCycle.move(moveFrom, targetDayID, targetButtonMidPoint, event.pageY)
                }
                else if(id.length === 3){ 
                    if(event.target.classList.contains("dayButton")) moveTo = 99
                    //we're dragging a single set within its parent row
                    if(targetDayID === id[1]) this.passThroughCycle.Days[targetDayID].move(id[2], moveTo, targetButtonMidPoint, event.pageX) 
                    else{ //we're dragging a single set between rows
                        draggedObject = this.passThroughCycle.Days[id[1]].Sets[id[2]]
                        this.passThroughCycle.Days[id[1]].remove(id[2])
                        this.passThroughCycle.Days[targetDayID].insert(moveTo, draggedObject, targetButtonMidPoint, event.pageX)
                    }
                }

            }else if(dragTargetIsCycle){
                targetButtonMidPoint = x+width/2
                let moveFrom = cycleId
                let moveTo = parseInt(target.innerText.split(' ')[1])-1
                //Dragging a cycle                               
                //reordering cycle indexing
                let currentCycle = this.state.currentCycle
                if(moveFrom){
                    this.editedRoutine.move(moveFrom, moveTo, targetButtonMidPoint, event.pageX)
                    this.setState({currentCycle: moveTo})
                }else if(id && id.length === 2){//Dragging a day
                     //inserting a day into CycleDestination
                     this.editedRoutine.Cycles[moveTo].insert(99, this.editedRoutine.Cycles[currentCycle].Days[id[1]])
                    //removing a day from CycleOrigin
                    this.passThroughCycle.removeDay(id[1])
                    //purging CycleOrigin if CycleOrigin.len = 0
                    if(!this.passThroughCycle.Days.length){
                        this.editedRoutine.removeCycle(currentCycle)
                        this.passThroughCycle = new CRoutineCycle(this.editedRoutine.Cycles[0])
                    }else{
                        this.editedRoutine.Cycles[currentCycle].removeDay(id[1])
                    }
                    this.setState({currentCycle: currentCycle})
                }    
            }
            
            /* ---- PROCESS DROP OFF END ---- */
            if(!dragTargetIsCycle){
                if(this.passThroughCycle.Days.length) this.editedRoutine.Cycles[this.state.currentCycle] = this.passThroughCycle.copy()
                else if(this.editedRoutine.Cycles.length) this.passThroughCycle = new CRoutineCycle(this.editedRoutine.Cycles[0])
                this.setState({cart:newCart})
            }
        }
    }
    cycleCycles = (event) => {
        event.preventDefault()
        let currentCycle = event.target.innerText.split(' ')[1]
        const clickToDuplicate = event.ctrlKey && event.target.innerText && event.target.innerText.match(/Cycle \d/)
        const clickToDelete = event.altKey && event.target.innerText && event.target.innerText.match(/Cycle \d/) 
        if(clickToDuplicate || clickToDelete){
            let targetCycle=parseInt(currentCycle)-1
        if(clickToDelete){
            this.editedRoutine.removeCycle(targetCycle)
            }
        else if(clickToDuplicate){
            this.editedRoutine.duplicateCycle(targetCycle)
            }
        this.setState({})
        }
        else{
            let newCycle: CRoutineCycle
            if(currentCycle === "+" && this.state.editing){
                newCycle = new CRoutineCycle()
                newCycle.Days[0]["Is rest day"] = true
                newCycle.Days[0].Sets = []
                this.editedRoutine.insert(99, newCycle)
                const newTabIdx = this.editedRoutine.Cycles.length-1
                this.passThroughCycle = new CRoutineCycle(this.editedRoutine.Cycles[newTabIdx])
                this.setState({currentCycle: newTabIdx})
            }else if(currentCycle!=="+"){
                currentCycle = parseInt(currentCycle)-1
                this.passThroughCycle = new CRoutineCycle(this.editedRoutine.Cycles[currentCycle])
                this.setState({currentCycle:currentCycle})
            }
        }
    }

    toggleEdit = (event) =>{
        event.preventDefault()
        if(event.target.innerText==="Save"){
            const newRoutine = new CRoutine(this.editedRoutine)
            this.setState({editing: !this.state.editing, currentRoutine:newRoutine, cart: []})
        }else if(event.target.innerText==="Edit"){
            this.setState({editing: !this.state.editing})
        }else if(event.target.innerText==="Cancel"){
            let currentCycle = this.state.currentCycle
            if(this.state.currentCycle+1>this.state.currentRoutine.Cycles.length){
                currentCycle = 0
            }
            this.passThroughCycle = new CRoutineCycle(this.state.currentRoutine.Cycles[currentCycle])
            this.editedRoutine = new CRoutine(this.state.currentRoutine)
            
            this.setState({editing: !this.state.editing, cart: [], currentCycle: currentCycle})
        }
    }
    
    saveRoutineToLocalStorage = () =>{
        this.state.LocalStorageProcessor.saveRoutine(this.state.currentRoutine)
    }

    render(){
        let cartStyle="row mb-3 ms-3 me-3 mt-0 cart-On-RoutineCustomization slideDown";
        let editingAreaStyle = "row ms-3 text-left fs-4 slideDown"
        const settingsButtonsStyle = "ms-5 cycleButton-Shadow rounded-0 w-25 btn btn-primary"
        let {editing, cart, currentCycle} = this.state
        return(
            <div className = "container-fluid p-2">
                {/* ----EDIT AREA ELEMENT START---- */}
                {editing ? (
                <div className={editingAreaStyle}>Editing Area:
                    <div className = {cartStyle} id="holdingArea" onDragOver={(e)=>{e.preventDefault()}} 
                    onDragEnter={(e)=>{e.preventDefault()}} onDrop={this.handleDragging}>
                    <ButtonGroup buttonType="cartButton" handleDragging={this.handleDragging} 
                    cart = {cart} editing={editing} sourceID={[-1, -1]} onClickHandler = {this.handleSetClick}/>
                </div></div>

                ):(null)}

                {/* ----EDIT AREA ELEMENT END---- */}

                {/* ----CYCLE TAB ELEMENT START---- */}
                <ButtonGroup buttonType="cycleNavigationButton" 
                cycleNum={this.editedRoutine.Cycles.length+1} 
                currentCycle={currentCycle} onClickHandler={this.cycleCycles}
                handleDragging = {this.handleDragging} editing = {this.state.editing}
                />
                {/* ----CYCLE TAB ELEMENT END---- */}

                {/* ----ROUTINE VIEW ELEMENT START---- */}
                <CycleWindow currentCycle = {currentCycle}
                passThroughCycle = {this.passThroughCycle}
                handleSetClick = {this.handleSetClick}
                handleDragging = {this.handleDragging}
                editing = {this.state.editing}/>    
                {/* ----ROUTINE VIEW END---- */}

                {/* ----SETTINGS BUTTONS ELEMENT START---- */}
                <div className = "row mt-4" id="changeSettingsArea">
                    <div className="col col-sm-9">

                        <button type="button" className={settingsButtonsStyle}>Set Schedule</button>
                        <button type="button" className={settingsButtonsStyle} 
                        onClick={this.toggleEdit}>{this.state.editing?(`Save`):(`Edit`)}</button>

                        {this.state.editing ? 
                        (<button type="button" className='ms-5 cancel_finalizeButton-RoutineCustomization rounded-0 w-25 btn' 
                        onClick={this.toggleEdit}>Cancel</button>)
                        :
                        (<button type="button" className='ms-5 cancel_finalizeButton-RoutineCustomization rounded-0 w-25 btn' 
                        onClick={this.saveRoutineToLocalStorage}>Finalize Routine</button>)}

                    </div>
                </div>
                {/* ----SETTINGS BUTTONS ELEMENT END---- */}
            </div>
        )
    }
}


export default RoutineCustomization