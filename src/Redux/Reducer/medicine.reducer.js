import * as ActionType from '../Action/Action_Type'
const initialstate = {
    isLoading : false,
    medicines : [],
    error: ''
}




export const medicineReducer = (state=initialstate, action) => {
    console.log( action.type, action.payload, state);
    switch(action.type){

        case ActionType.LOADING_MEDICINE:
            return{
                ...state,
                isLoading: true,
                error: ''
            }
        
        case ActionType.GET_MEDICINES:
            return{
                ...state,
                isLoading: false,
                medicines: action.payload,
                error: ''
            }

            case ActionType.ERROR_MEDICINE:
            return{
                ...state,
                isLoading: false,
                medicines: [],
                error: action.payload
            }

            case ActionType.ADD_MEDICINE:
            return{
                ...state,
                isLoading: false,
                medicines: state.medicines.concat(action.payload),
                error: ''
            }

            case ActionType.DELETE_MEDICINE:
            return{
                ...state,
                isLoading: false,
                medicines: state.medicines.filter((d,i)=>d.id !== action.payload),
                error: ''
            }

            case ActionType.UPDATE_MEDICINE:
            return{
                ...state,
                isLoading: false,
                medicines: state.medicines.map((l)=>{
                    if(l.id === action.payload.id){
                        return action.payload
                    }
                    else{
                        return l;
                    }
                }),
                error: ''
            }

        default : return state    

    }

}