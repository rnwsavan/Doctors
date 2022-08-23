import * as ActionType from '../Action/Action_Type'

export const incrementcounter = () => (dispatch) => {
    dispatch({type: ActionType.INCREMENT_DATA})
}

export const decrementcounter = () => (dispatch) => {
    dispatch({type: ActionType.DECREMENT_DATA})
}