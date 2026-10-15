
import { useState } from "react";
import CardEtudiant from "./CardEtudiant.jsx";
import FormEtudiant from "./FormEtudient.jsx";
import Select from './selectClass.jsx'
import data from "./etudiant.jsx";
import ButtonCount from './buttonCount.jsx'
function Content() {
    
    const [etudiants, setEtudiants] = useState(data);
    const [etudiant, setEtudiant] = useState({
        id:"",
        nom:"",
        prenom:"",
        note:"",
        group:""
    });
    const [groupes, setGroupes] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [onRemplir , setOnRemplir] = useState(false)
    function remplir(etudiant) {
        setEtudiant(etudiant)
        setOnRemplir(true)
    }
    function onInput(e){
        const {name,value} = e.target;
        setEtudiant({...etudiant,[name]:value});
    }
    function initialisation() {
        setEtudiant({id:"",nom:"",prenom:"",note:"",group:""})
    }
    function ajouter() {
        setEtudiants({...etudiants, [etudiant.group]:[...etudiants[etudiant.group],etudiant] })
        initialisation()
    }
    function editEtudiant(group) {
        const newEtudiant = { id: etudiant.id, nom: etudiant.nom, prenom: etudiant.prenom, note: etudiant.note };
        const modifiedEtudiants = {}
        if (group === '') {
            Object.keys(etudiants).forEach(classe => {
                modifiedEtudiants[classe] = etudiants[classe].map(etud => {
                    if (etud.id == etudiant.id) {
                        return newEtudiant
                    }
                    return etud
                });
                return modifiedEtudiants
            })
            setEtudiants(modifiedEtudiants)
            setOnRemplir(false)
            initialisation()
        } else {
            const modifiedEtudiants = etudiants[group].map(etud => {
                if (etud.id == etudiant.id) {
                    return newEtudiant
                }
                return etud
            });
            setEtudiants({ ...etudiants, [group]: modifiedEtudiants })
            initialisation()
        }
    }
    let button = <button onClick={ajouter} className="py-2 px-4 shadow-sm cursor-pointer transition duration-200 hover:bg-emerald-500/30  bg-emerald-500/10 text-emerald-600 rounded-2xl cursor">ajouter</button>;
    if (onRemplir && etudiant.id && etudiant.nom && etudiant.prenom && etudiant.note) {
        button = <button onClick={() => editEtudiant(selectedGroup)} className="py-2 px-4 shadow-sm cursor-pointer transition duration-200 hover:bg-emerald-500/30  bg-cyan-500/10 text-cyan-600 rounded-2xl cursor">edit</button>;
    }


    return (
        <main className="flex-1 p-8 flex flex-col gap-2">
            <ButtonCount/>
            <input value={etudiant.id} onChange={onInput} name="id" type="text" placeholder="id" />
            <input value={etudiant.nom} onChange={onInput} name="nom" type="text" placeholder="nom" />
            <input value={etudiant.prenom} onChange={onInput} name="prenom"  type="text" placeholder="prenom" />
            <input value={etudiant.note} onChange={onInput} name="note" type="text" placeholder="note" />
            <input value={etudiant.group} onChange={onInput} name="group" type="text" placeholder="group" disabled={onRemplir ? true : false} />
            {button}
            <h2 className="text-3xl font-bold">
                Bienvenue
            </h2>

            <p className="mt-3 text-slate-600">
                Bienvenue dans l'application.
            </p>
            <Select onRemplir={remplir} initialisation={initialisation} etudiants={etudiants} setEtudiants={setEtudiants} groupes={groupes} setGroupes={setGroupes} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />

        </main>
    );
}

export default Content;

