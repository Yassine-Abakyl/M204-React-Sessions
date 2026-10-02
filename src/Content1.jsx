
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
    function ajouter() {
        setEtudiants([...etudiants, { id: 7, prenom: "mouad", nom: "ait ahmed", note: 20 }])
    }
    return (
        <main className="flex-1 p-8 flex flex-col gap-2">
            <FormEtudiant />
            <h2 className="text-3xl font-bold">
                Bienvenue
            </h2>

            <p className="mt-3 text-slate-600">
                Bienvenue dans l'application.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {etudiants.map(function (item, index) {
                    return <CardEtudiant key={index} etudiant={item} />
                })}

            </div>
            <button onClick={ajouter} className="py-2 px-4 shadow-sm cursor-pointer transition duration-200 hover:bg-emerald-500/30  bg-emerald-500/10 text-emerald-600 rounded-2xl cursor">ajouter</button>

        </main>
    );
}

export default Content;