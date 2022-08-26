import { combineReducers } from "redux";
import { doctorReducer } from "./doctors.reducer";


export const rootReducer = combineReducers({

    doctor:doctorReducer,
 

    
})

