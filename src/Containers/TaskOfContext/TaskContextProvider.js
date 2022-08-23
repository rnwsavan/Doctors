import React from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';
import { ThemeReducer } from './reducer/theme.reducer';
import * as ActionType from '../TaskOfContext/ActionType'

export const TaskContext = createContext();

const intVal = {
    theme: 'light_theme',
}

function TaskContextProvider({ children }) {

    const [state, dispatch] = useReducer(ThemeReducer, intVal);

     const toogle_theme = (theme) => {
        const newTheme = theme === 'light_theme' ? 'dark_theme' : 'light_theme';
        dispatch(({ type: ActionType.TOOGLE_THEME, payload: newTheme }))
    }
    return (
        <TaskContext.Provider value={
            {
                ...state
                , toogle_theme
            }
        }>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskContextProvider;