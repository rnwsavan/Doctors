import { combineReducers } from "redux";
import { CounterReducer } from "./counter.reducer";
import { doctorReducer } from "./doctor.reducer";
import { medicineReducer } from "./medicine.reducer";

export const rootReducer = combineReducers({
    Counter: CounterReducer,
    medikit: medicineReducer,
    doctordata: doctorReducer
})