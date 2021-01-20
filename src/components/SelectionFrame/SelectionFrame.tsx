/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, {Component} from 'react'
import './SelectionFrame.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'
import history from '../../history'
interface IProps{

}
interface IState{
    currentPage: string;
    choices: Array<string>;
    menu: {};
    currentLocation: string;
    oldState: {}
}

class SelectionFrame extends React.Component<IProps, IState> {
    constructor(props){
        super(props)
        this.state = {
            currentPage: "WelcomeScreen",// pageOptions: ["WelcomeScreen", "CustomRoutine", "RoutineFocus", "ExperienceLevel"],
            choices:[],
            menu:{
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
                }
            },
            currentLocation: 'selectionFrame',
            oldState: {}
        }
    }
    handleClick = (event) =>{
        event.preventDefault()
        let nextPage: string
        const innerText = event.target.innerText
        const state = this.state
        if(state.currentPage === "WelcomeScreen"){
            if(innerText==="Select a pre approved program") nextPage = "RoutineFocus"
            else nextPage = "CustomRoutine"
        }else if(state.currentPage === "CustomRoutine"){
            //extrenal documents needed
        }else if(state.currentPage === "RoutineFocus"){
            nextPage = "ExperienceLevel"
        }else if(state.currentPage === "ExperienceLevel"){
            //external documents needed
        }
        const newState = {...this.state}
        if(nextPage){
            newState.choices = [...newState.choices, innerText]
            newState.currentPage = nextPage
            newState.oldState = {...this.state}
        }
        if(nextPage){
            history.push({pathname:'/', state: this.state})
            this.setState(newState)
        }
    }
    componentWillUpdate(){
        history.location.state = this.state.oldState
    }
    componentDidUpdate(){
        window.onpopstate = () =>{
            if(history.location && history.location.state){
                this.setState(history.location.state)
            }
        }
    }
 
    render(){
        const state = this.state
        const dataCurrentPage = state.menu[state.currentPage]
        return (
            <div className="card m-2 border-3 bg-light">
                    <div className="card-body">
                        <h5 className="card-title">{dataCurrentPage.title}</h5>
                        <ul>
                            {dataCurrentPage.menuOptions.map(option => <li className="btn btn-light w-100 mt-2 border-3" onClick = {this.handleClick}>{option}</li>)}    
                        </ul>
                    </div>
            </div>
        )
    }
}

// function switchPages(target){

//     switch(target){
//         case "Select a pre approved program":
//             return "RoutineFocus"
//         case "Create Custom Program":
//             return "CustomRoutine"
//         case "General Fitness/Functional Fitness":
//         case "Weightloss & Streamline": 
//         case "Strength & Tone":
//         case "Abs & Core": 
//         case "Just Take Me To a Routine":
//             return "ExperienceLevel"
//         //Local state manipulation ends. External resources needed for:
//         case "Pick exercises from our database":
//             return "LoadExerciseDatabase"
//         case "Text Entry":
//             return "CustomEntry"
//         case "Beginner":
//         case "Intermediate":
//         case "Advanced":
//     }

// }

export default withRouter(SelectionFrame)

