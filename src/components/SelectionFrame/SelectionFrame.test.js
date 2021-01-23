import React from 'react';
import ReactDOM from 'react-dom';
import SelectionFrame from './SelectionFrame';
import history from '../../history.ts'
import {render, fireEvent, screen, cleanup} from "@testing-library/react";

const frameTitles = ["Welcome to the site. Would you like to:", "Create your program:", "What is your fitness goal?", "What is your experience level?"]
const menuOptions = [ //Second index is the index of target page menu. If idx is -1, means the menu doesnt lead anywhere or is not connected at the moment.
    //That index also reflects the screenTitles index
    ["Select a pre approved program", "Create Custom Program"],
    ["Pick exercises from our database", "Text Entry"],
    ["General Fitness/Functional Fitness","Weightloss & Streamline","Strength & Tone","Abs & Core","Just Take Me To a Routine"],
    ["Beginner", "Intermediate", "Advanced"]
]
const menuDestinationIndexes = {
    "Select a pre approved program" : 2,
    "Create Custom Program" : 1,
    "Pick exercises from our database" : -1,
    "Text Entry" : -1,
    "General Fitness/Functional Fitness" : 3,
    "Weightloss & Streamline" : 3,
    "Strength & Tone" : 3,
    "Abs & Core" : 3,
    "Just Take Me To a Routine" : 3,
    "Beginner" : -1,
    "Intermediate" : -1,
    "Advanced" : -1
}
const fakeMenuChoice = ["TEXT ENTRY", "beginner", "Select apre approved program", "General FitnessFunctional Fitness"]

describe("Basic Render Test", ()=>{
    it('renders SelectionFrame without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SelectionFrame />, div);
        ReactDOM.unmountComponentAtNode(div);
    });    
})

describe("Testing Menu Components that are hardcorded", ()=>{
    //Because of the loops in this test the tests declared with "it" always pass.
    //They are there simply to visually confirm that all the menu combinations have been explored
    //You will still be notified if any other test fails(i.e. getByText cant find target)
    describe("Testing the rest of the menus", ()=>{
        while(menuOptions[0].length){
            let menu2Len = menuOptions[2].length
            render(<SelectionFrame/>) 
            let iterate = true;
            let i = 0;
            let currentPath = []
            while(iterate){
                testingTheMenuContent(i)
                let buttonText = menuOptions[i][0]
                let prevIdx = i
                i = menuDestinationIndexes[buttonText]
                currentPath.push(buttonText)
                if(i===-1 || !menuOptions[i].length){
                    menuOptions[prevIdx].shift()
                    iterate = false
                    break;
                }
                let eventConfig = {button: 1, target:{innerText:`${buttonText}`}}
                fireEvent.click(screen.getByText(buttonText), eventConfig)
            }
            it(`Completed path: ${currentPath.join('->')}`, ()=>{expect(1).not.toBeNull()})
            //because multiple instances lead to menuOptions[3] we restore it if the testing for a single 
            //entry of menuOptions[2] is complete.
            //(since it makes more than one call per each menuOptions[2] entry).
            if(menuOptions[2].length<menu2Len) menuOptions[3] =  ["Beginner", "Intermediate", "Advanced"]
            cleanup()
        }
    })
})

function testingTheMenuContent(idx){
    expect(screen.getByText(frameTitles[idx])).not.toBeNull()
    menuOptions[idx].forEach(option => {
        expect(screen.getByText(option)).not.toBeNull()
    })
    fakeMenuChoice.forEach(option => {
        expect(screen.queryByText(option)).not.toBeInTheDocument()
    })
}
