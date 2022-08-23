import React from 'react';
import { useEffect } from 'react';

function PromisesExample(props) {
    const one = () => {
        return "One Example"
    }

    const Two = () => {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve("Two Example");
            }, 2000);
        }) 
    }

    const Three = () => {
        return "Three Example"
    }

    const All = async () => {
        const o = one()
        console.log(o);

        const t = await Two()
        console.log(t);

        const th = Three()
        console.log(th)
    }

    const display = (z) => {
        console.log(z);
    }

    const sum = (display) => {
        let x=20, y=30;

        let z;

        z = x + y;

        display(z)
    }

    sum(display)

    useEffect(() => {
        All()
    },
    [])
    return (
        <div>
            
        </div>
    );
}

export default PromisesExample;