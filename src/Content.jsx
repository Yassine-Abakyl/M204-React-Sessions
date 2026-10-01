
import CardEtudiant from "./CardEtudiant.jsx";

function Content() {
    return (
        <main className="flex-1 p-8">

            <h2 className="text-3xl font-bold">
                Bienvenue
            </h2>

            <p className="mt-3 text-slate-600">
                Bienvenue dans l'application.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-5">

                <CardEtudiant nom="Yassine" note= {19} />

                <CardEtudiant nom="Yasmine" note={18} />

                <CardEtudiant nom="Yousra" note= {17} />

                <CardEtudiant nom="Youssef" note= {16} />

            </div>

        </main>
    );
}

export default Content;
