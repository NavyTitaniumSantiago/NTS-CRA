import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Auth, SelectionFrame, CustomEntry, ExerciseList, ExerciseInfo, RoutineCustomization, LiveRoutine, Profile} from './indexComponents.js'
class Routes extends React.Component<any>{
    render(){
        return(
            <Switch>   
                <Route path="/signup" component = {Auth}/>
                <Route path="/login" component = {Auth}/>
                <Route path="/selection" component = {SelectionFrame} />
                <Route path="/custom" component = {CustomEntry}/>
                <Route path="/exerciselist" component = {ExerciseList}/>
                <Route path="/exerciseinfo" component = {ExerciseInfo}/>
                <Route path="/routine" component = {RoutineCustomization}/>
                <Route path="/live" component = {LiveRoutine}/>
                <Route path="/profile" component = {Profile}/>
                <Route path="/" component = {SelectionFrame}/>
            </Switch>
        )
    }
}

export default withRouter(Routes)