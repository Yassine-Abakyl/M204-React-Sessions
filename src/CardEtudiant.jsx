function CardEtudiant({ etudiant }) {
  return (
    <>
      {etudiant.note < 10 ? (
        <div className="rounded-xl bg-red-50/90 border border-red-200 p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-red-900">
              {etudiant.prenom} {etudiant.nom}
            </h3>
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-md">
              non admis
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-red-700">
            moyenne : <span className="text-base font-bold">{etudiant.note}</span> / 20
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-emerald-50/90 border border-emerald-200 p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-emerald-900">
              {etudiant.prenom} {etudiant.nom}
            </h3>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-md">
             admis
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-emerald-700">
            moyenne : <span className="text-base font-bold">{etudiant.note}</span> / 20
          </p>
        </div>
      )}
    </>
  );
}

export default CardEtudiant;


// props : sert a echanger l'information entre les composants, on peut passer des informations d'un composant parent vers un composant enfant.
// we reseve props with destractring like that : CardEtudiant({ nameProps }) => and use it : nameProps
// we reseve props with simple way like that : CardEtudiant(props) => and use it : props.nameProps
//ternary condition in jsx : {condition ? ifItsTrueDoThis : orDoThis}