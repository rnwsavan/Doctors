import React, { useMemo, useState } from 'react';

function HookExample(props) {
    const[number,setNumber] = useState(0);
    const[count,setCount] = useState(0);

    const findfactorial = (n) => {
        console.log("findFactorial");
        if(n > 1){
            return n * findfactorial(n-1);
        }
        else{
            return 1;
        }
    }


    // WithOut UseMemo
    // const result = findfactorial(number);

    // with UseMemo
    const result = useMemo(()=> {return findfactorial(number)},
    [number])

    return (
        <div>
            <input placeholder='Please enter Value' onChange={(e) =>setNumber(e.target.value)}/>
            <button onClick={() => setCount(count + 1)}>Change</button>

            <p>Count Value is : {count}</p>
            <p>Factorial Value is : {result}</p>
        </div>
    );
}

export default HookExample;