import { useState } from "react";
import Crono from "./count.jsx";

function ButtonCount(){
    const [affiche , setAfficher] = useState(false)
    function showHide(){
        setAfficher(!affiche)
    }
    return <>
    <button onClick={showHide}>{affiche == true ? "hide" : "show"}</button>
            {affiche==true && <Crono/>}
    </>
}
export default ButtonCount