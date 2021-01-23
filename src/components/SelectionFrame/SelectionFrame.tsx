/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, {Component} from 'react'
import './SelectionFrame.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'
import history from '../../history'

interface IState{
    currentPage: string;
    choices: Array<string>;
    currentLocation: string;
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
        if(state.currentPage === "WelcomeScreen"){
            if(innerText==="Select a pre approved program") nextPage = "RoutineFocus"
            else nextPage = "CustomRoutine"
        }else if(state.currentPage === "CustomRoutine"){
            //extrenal documents needed
           // nextPage = "WelcomeScreen"
        }else if(state.currentPage === "RoutineFocus"){
            nextPage = "ExperienceLevel"
        }else if(state.currentPage === "ExperienceLevel"){
            //external documents needed
            //nextPage = "WelcomeScreen"
        }
        const newState = {...this.state}
        if(nextPage){
            newState.choices = [...newState.choices, innerText]
            newState.currentPage = nextPage
            newState.oldState = {...this.state}

            this.setState(newState)
        }
  
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        window.history.pushState(this.state.oldState,"")
        return null
    }
    componentDidUpdate(event){
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
            }
        }
        const state = this.state
        const dataCurrentPage = menu[state.currentPage]
        return (
            <div className="card m-2 border-3 bg-light">
                    <div className="card-body">
                        <h5 className="card-title">{dataCurrentPage.title}</h5>
                        <ul>
                            {dataCurrentPage.menuOptions.map(option => <li key = {option} className="btn btn-light w-100 mt-2 border-3" onClick = {this.handleClick}>{option}</li>)}    
                        </ul>
                    </div>
            </div>
        )
    }
}


export default SelectionFrame

