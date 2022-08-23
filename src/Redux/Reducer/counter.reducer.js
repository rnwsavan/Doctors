import * as ActionType from '../Action/Action_Type'

const initalstate = {
    Counter: 0
}

export const CounterReducer = (state = initalstate, action) => {
    switch (action.type) {
        case ActionType.INCREMENT_DATA:
            return {
                ...state,
                Counter: state.Counter + 1
            }
        case ActionType.DECREMENT_DATA:
            return {
                ...state,
                Counter: state.Counter - 1
            }
        default:
            return state
    }
}