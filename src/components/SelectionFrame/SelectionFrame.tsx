/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { faWindowRestore } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import {LocalDataProcessor} from '../logicComponents.js'
import './SelectionFrame.css'

interface IState{
    currentPage: string;
    choices: Array<string>;
    currentLocation: string;
    routines: Array<string>;
    oldState: {
        choices: Array<string>;
        currentPage: string;
    }
}

class SelectionFrame extends React.Component<any, IState> {
    constructor(props: any){
        super(props)
        this.state = {
            currentPage: "WelcomeScreen",// pageOptions: ["WelcomeScreen", "CustomRoutine", "RoutineFocus", "ExperienceLevel"],
            choices:[],
            currentLocation: 'selectionFrame',
            routines: [],
            oldState: {
                choices:[],
                currentPage: ''
            }
        }
    }

    handleClick = (event) =>{
        event.preventDefault()
        let nextPage: string = ''
        const innerText = event.target.innerText
        const state = this.state
        const newState = {...this.state}

        if(state.currentPage === "WelcomeScreen"){
            if(innerText==="Select a pre approved program") nextPage = "RoutineFocus"
            else nextPage = "CustomRoutine"
        }else if(state.currentPage === "CustomRoutine"){
            //extrenal documents needed
           // nextPage = "WelcomeScreen"
        }else if(state.currentPage === "RoutineFocus"){
            nextPage = "ExperienceLevel"
        }else if(state.currentPage === "ExperienceLevel"){
            nextPage = "RoutineList"
            const fetchedRoutines = LocalDataProcessor.getRoutineNameByKeywords([this.state.choices[1], innerText])
            newState.routines = fetchedRoutines
        }else{
            const currentRoutine = LocalDataProcessor.getRoutineByRoutineName(innerText)
            this.setState({choices:[...this.state.choices, innerText]})
            this.props.history.push({pathname: '/routine', state: {currentRoutine}})
        }
 
        if(nextPage){
            newState.choices = [...newState.choices, innerText]
            newState.currentPage = nextPage
            newState.oldState = {...this.state}
            this.setState(newState)
        }
  
    }
    componentDidMount(){
        if(event) this.setState(window.history.state)
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log(12, prevState)
        if(this.state.currentPage === "RoutineList" && prevState.currentPage !=="RoutineList") window.history.pushState(this.state,"")
        else window.history.pushState(this.state.oldState,"")
        return null
    }
    componentDidUpdate(event){
        console.log(56, window.history)

        window.onpopstate = () =>{
            if(window.history.state && window.history.state.currentPage) this.setState(window.history.state)
        }
    }
 
    render(){
        const menu = {
            WelcomeScreen:{
                title: "Welcome to the site. Would you like to:",
                menuOptions: ["Select a pre approved program", "Create Custom Program"]
            },
            CustomRoutine:{
                title: "Create your program:",
                menuOptions:["Pick exercises from our database", "Text Entry"]
            },
            RoutineFocus:{
                title: "What is your fitness goal?",
                menuOptions:["General Fitness/Functional Fitness", "Weightloss & Streamline", "Strength & Tone", "Abs & Core", "Just Take Me To a Routine"]
            },
            ExperienceLevel:{
                title: "What is your experience level?",
                menuOptions:["Beginner", "Intermediate", "Advanced"]
            },
            RoutineList: {
                title: "Please select a routine",
                menuOptions:this.state.routines
            }
        }
        const state = this.state
        const dataCurrentPage = menu[state.currentPage]
        return (
            <div className="card m-2 border-primary rounded-0 border-2">
                    <div className="card-body">
                        <h5 className="card-title">{dataCurrentPage.title}</h5>
                        <ul>
                            {dataCurrentPage.menuOptions.map(option => <li key = {option} tabIndex={0} className="btn w-100 mt-2 button-SelectionFrame rounded-0 border-2" onClick = {this.handleClick} onKeyDown = {this.handleClick}>{option}</li>)}    
                        </ul>
                    </div>
            </div>
        )
    }
}


export default SelectionFrame

