function CardEtudiant({ etudiant , remplir }) {
  return (
    <>
      {etudiant.note < 10 ? (
        <div onClick={()=>remplir(etudiant)} className="rounded-xl bg-red-50/90 border border-red-200 p-5 shadow-sm transition-all hover:shadow-md">
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
        <div onClick={()=>remplir(etudiant)} className="rounded-xl bg-emerald-50/90 border border-emerald-200 p-5 shadow-sm transition-all hover:shadow-md">
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
