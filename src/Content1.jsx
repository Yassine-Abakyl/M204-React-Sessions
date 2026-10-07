
import { useState } from "react";
import CardEtudiant from "./CardEtudiant.jsx";
import FormEtudiant from "./FormEtudient.jsx";

function Content() {
    const [etudiants, setEtudiants] = useState([
        { id: 1, prenom: "hanane", nom: "atermouh", note: 6 },
        { id: 2, prenom: "wissal", nom: "othman", note: 7 },
        { id: 3, prenom: "yassine", nom: "abakyl", note: 20 },
        { id: 4, prenom: "hajar", nom: "aalam", note: 15 },
        { id: 5, prenom: "oussama", nom: "salby", note: 16 },
        { id: 6, prenom: "Yasmine", nom: "ouabi", note: 20 }
    ]);
    const [id, setId] = useState()
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [note, setNote] = useState()
    function remplir(etudiant) {
        setId(etudiant.id)
        setNom(etudiant.nom)
        setPrenom(etudiant.prenom)
        setNote(etudiant.note)
    }
    function ajouter() {
        setEtudiants([...etudiants, { id, nom, prenom, note }])
        initialisation()
    }
    function initialisation() {
        setId("")
        setNom("")
        setPrenom("")
        setNote("")
    }
    function deleteEtudiant(idEtudiantSelected) {
        if(confirm("are u sure")){
            const filtredEtudiants = etudiants.filter(etudiant => etudiant.id !== idEtudiantSelected)
            setEtudiants(filtredEtudiants)
            initialisation()
        }
    }
    function editEtudiant() {
        const newEtudiant = { id: id, nom: nom, prenom: prenom, note: note }
        const modifiedEtudiants = etudiants.map(etudiant => {
            if (etudiant.id == id) {
                return newEtudiant
            }
            return etudiant
        });
        setEtudiants(modifiedEtudiants)
        initialisation()
    }
    let button = <button onClick={ajouter} className="py-2 px-4 shadow-sm cursor-pointer transition duration-200 hover:bg-emerald-500/30  bg-emerald-500/10 text-emerald-600 rounded-2xl cursor">ajouter</button>;
    if (id && nom && prenom && note) {
        button = <button onClick={editEtudiant} className="py-2 px-4 shadow-sm cursor-pointer transition duration-200 hover:bg-emerald-500/30  bg-cyan-500/10 text-cyan-600 rounded-2xl cursor">edit</button>;    }
    return (
        <main className="flex-1 p-8 flex flex-col gap-2">
            <input value={id} onChange={(e) => { setId(e.target.value) }} type="text" placeholder="id" />
            <input value={nom} onChange={(e) => { setNom(e.target.value) }} type="text" placeholder="nom" />
            <input value={prenom} onChange={(e) => { setPrenom(e.target.value) }} type="text" placeholder="prenom" />
            <input value={note} onChange={(e) => { setNote(e.target.value) }} type="text" placeholder="note" />
            {button}
            <h2 className="text-3xl font-bold">
                Bienvenue
            </h2>

            <p className="mt-3 text-slate-600">
                Bienvenue dans l'application.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {etudiants.map(function (item, index) {
                    return <CardEtudiant key={index} etudiant={item} onRemplir={remplir} onDeleteEtudiant={deleteEtudiant} />
                })}

            </div>

        </main>
    );
}

export default Content;

