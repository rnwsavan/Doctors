import React, { useCallback, useState } from 'react';
import ListItem from '../ListItem/ListItem';

function UseCallBack(props) {
    const [dark , setDark] = useState(false);
    const [number, setNumber] = useState(0);

    const theme = {
        backgroundColor : dark ? '#13D894' : '#fff',
        color : dark ? '#fff' : '#13D894'
    }

    const getItem = useCallback((i) => {
        return[i + number, i + number + 1, i + number + 2, i + number + 3]
    },[number])
    return (
        <div style={theme}>
            <button onClick={() => setDark(!dark)}>Change Theme</button>
            <input type="text" placeholder='enter your number' onChange={(e) => setNumber(parseInt(e.target.value))}/>

            <ListItem getItem ={getItem}/>
        </div>
    );
}

export default UseCallBack;