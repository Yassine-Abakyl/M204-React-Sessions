import { useState } from "react";
function FormEtudiant(){
    const [nom,setNom] = useState('')
    function sayHello(vnom){
        setNom(vnom)
    }
    return(
        <>
        <button onClick={()=>sayHello("khalid")} className="bg-blue-500">say hello!</button>
        {nom}
        </>
    )
}
export default FormEtudiant