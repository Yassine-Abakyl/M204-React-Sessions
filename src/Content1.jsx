
import CardEtudiant from "./CardEtudiant.jsx";

const etudiants = [
    {id: 1, prenom:"Sara", nom:"marzouk",note: 15},
    {id: 2, prenom:"Youssef",nom:"madi", note: 7},
    {id: 3, prenom:"Amin", nom:"abi",note: 18},
    {id: 4, prenom:"Amina", nom:"zaki",note: 5},
    {id: 5, prenom:"Yousra", nom:"juli",note: 16},
    {id: 6, prenom:"Yasmin", nom:"ouabi",note: 20}
];

function Content() {
    return (
        <main className="flex-1 p-8">

            <h2 className="text-3xl font-bold">
                Bienvenue
            </h2>

            <p className="mt-3 text-slate-600">
                Bienvenue dans l'application.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-5">

                {etudiants.map(function(item){
                    return <CardEtudiant key={item.id} etudiant={item} />
                })}

            </div>

        </main>
    );
}

export default Content;
// we sent props like that : <Component nameProp="value" nameProp={value} />
