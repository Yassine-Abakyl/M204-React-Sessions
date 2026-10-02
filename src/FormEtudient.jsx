import { useState } from "react";
function FormEtudiant({ etudiants, setEtudiants }) {
    const [id, setId] = useState()
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [note, setNote] = useState()
    function ajouter() {
        setEtudiants([...etudiants, { id, nom, prenom, note }])
        setId("")
        setNom("")
        setPrenom("")
        setNote("")
    }
    return (
        <>
            <input value={id} onChange={(e) => { setId(e.target.value) }} type="text" placeholder="id" />
            <input value={nom} onChange={(e) => { setNom(e.target.value) }} type="text" placeholder="nom" />
            <input value={prenom} onChange={(e) => { setPrenom(e.target.value) }} type="text" placeholder="prenom" />
            <input value={note} onChange={(e) => { setNote(e.target.value) }} type="text" placeholder="note" />
            <button onClick={ajouter} className="py-2 px-4 shadow-sm cursor-pointer transition duration-200 hover:bg-emerald-500/30  bg-emerald-500/10 text-emerald-600 rounded-2xl cursor">ajouter</button>
            {nom}
        </>
    )
}
export default FormEtudiant