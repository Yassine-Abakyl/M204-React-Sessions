function CardEtudiant({ etudiant, onRemplir, group , onDeleteEtudiant }) {
  return (
    <>
      {etudiant.note < 10 ? (
        <div className="flex flex-col gap-1 rounded-xl bg-red-50/90 border border-red-200 p-5 shadow-sm transition-all hover:shadow-md">
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
          <div className="flex gap-2 self-end">
            <button onClick={() => onRemplir(etudiant)} className="py-2 px-4 shadow-sm cursor-pointer transition duration-200 hover:bg-emerald-500/30  bg-cyan-500/10 text-cyan-600 rounded-2xl cursor">edit</button>
            <button onClick={() => onDeleteEtudiant(etudiant.id,group)} className="py-2 px-4 shadow-sm cursor-pointer transition duration-200 hover:bg-emerald-500/30  bg-red-500/10 text-red-600 rounded-2xl cursor">delete</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1 rounded-xl bg-emerald-50/90 border border-emerald-200 p-5 shadow-sm transition-all hover:shadow-md">
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
          <div className="flex gap-2 self-end">
            <button onClick={() => onRemplir(etudiant)} className="py-2 px-4 shadow-sm cursor-pointer transition duration-200 hover:bg-emerald-500/30  bg-cyan-500/10 text-cyan-600 rounded-2xl cursor">edit</button>
            <button onClick={() => onDeleteEtudiant(etudiant.id,group)} className="py-2 px-4 shadow-sm cursor-pointer transition duration-200 hover:bg-emerald-500/30  bg-red-500/10 text-red-600 rounded-2xl cursor">delete</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CardEtudiant;
