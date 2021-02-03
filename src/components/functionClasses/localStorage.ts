
import {IRoutine} from '../interfaces.js'
import {CRoutine} from './routineClasses/routineClasses'
export class LocalStorageProcessor{
    private storage: any; 
    private routine: IRoutine | null;
    private history: any;//specify when schema devised
    private userdata: any;//specify when schema devised
    private storageName: string;

    constructor(){
        this.storage = window.localStorage;
        this.routine = new CRoutine();
        this.history = undefined;
        this.userdata = undefined;
        this.storageName = "OMRNTSWorkoutApp";
        this.getLocalStorage()
    }

    private getLocalStorage(): void{
        this.getLShistory();
        this.getLSuserdata();
        this.getLSroutine();
    }
    private getLSroutine(): void{
        this.routine = this.storage.getItem(this.storageName+'Routine')
    }
    private getLShistory(): void{
        this.history = this.storage.getItem(this.storageName+'History')
    }
    private getLSuserdata(): void{
        this.userdata = this.storage.getItem(this.storageName+'Userdata')
    }
    getRoutine(): IRoutine | null{
        if(!this.routine) this.getLSroutine()
        return this.routine
    }
    saveRoutine(routineIn:IRoutine): string {
        try {
            this.routine = routineIn
        } catch (error) {
            return error
        }
        return "Routine saved with "+ this.saveRoutineToLocalStorage()
    }

    private saveRoutineToLocalStorage(): string{ //separated for addition integrity checks- TBD
        try {
            this.storage.setItem(this.storageName+"Routine", this.routine)
        } catch (error) {
            return error
        }
        return "success"
    }

}