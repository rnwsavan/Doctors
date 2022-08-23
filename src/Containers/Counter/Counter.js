import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { decrementcounter, incrementcounter } from '../../Redux/Action/counter.action';

function Counter(props) {
    const dispatch = useDispatch();
    const Count = useSelector(state => state.Counter);

    const handleIncrement = () => {
        dispatch(incrementcounter())
    }

    const handleDecrement = () => {
        dispatch(decrementcounter())
    }
    return (
        <div>
            <button onClick={() => handleIncrement()}>+</button>
            <p> {Count.Counter} </p>
            <button onClick={() => handleDecrement()}>-</button>
        </div>
    );
}

export default Counter;