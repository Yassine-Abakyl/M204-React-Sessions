import { useEffect, useState } from "react";

function Crono(){
    const [secondes , setSeconds] = useState(0)
    useEffect(()=>{
        const inervalId = setInterval(()=>{
            setSeconds((s)=>s+1)
            console.log("running")
        },1000)
        return ()=>{
            clearInterval(inervalId)
            console.log("End")
        }
    })
    return (
        <div>
            <label>{secondes}</label>
            <p>our crono component</p>
        </div>
    )
}
export default Crono