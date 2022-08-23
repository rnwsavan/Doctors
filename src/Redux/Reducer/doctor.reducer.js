import * as ActionType from '../Action/Action_Type'
const initialstate = {
    isLoading : false,
    doctors : [],
    error: ''
}




export const doctorReducer = (state=initialstate, action) => {
    console.log( action.type, action.payload, state);
    switch(action.type){

        case ActionType.LOADING_DOCTOR:
            return{
                ...state,
                isLoading: true,
                error: ''
            }
        
        case ActionType.GET_DOCTORS:
            return{
                ...state,
                isLoading: false,
                doctors: action.payload,
                error: ''
            }

            case ActionType.ERROR_DOCTOR:
            return{
                ...state,
                isLoading: false,
                doctors: [],
                error: action.payload
            }

            case ActionType.ADD_DOCTOR:
            return{
                ...state,
                isLoading: false,
                doctors: state.doctors.concat(action.payload),
                error: ''
            }

            case ActionType.DELETE_DOCTOR:
            return{
                ...state,
                isLoading: false,
                doctors: state.doctors.filter((d,i)=>d.id !== action.payload),
                error: ''
            }

            case ActionType.UPDATE_DOCTOR:
            return{
                ...state,
                isLoading: false,
                doctors: state.doctors.map((l)=>{
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