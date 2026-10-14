// import data from './etudiant.jsx';
import { useEffect } from 'react';
import CardEtudiant from './CardEtudiant.jsx'
function Select({ onRemplir, etudiants, setEtudiants, groupes, setGroupes, selectedGroup, setSelectedGroup }) {

    const classes = Object.keys(etudiants);
    function deleteEtudiant(idEtudiantSelected, group) {
        if (confirm("are u sure")) {
            if (!selectedGroup) {
                const filtredEtudiants = etudiants[group].filter(etudiant => etudiant.id !== idEtudiantSelected)
                setEtudiants({ ...etudiants, [group]: filtredEtudiants })
            } else if (selectedGroup) {
                const filtredEtudiants = etudiants[selectedGroup].filter(etudiant => etudiant.id !== idEtudiantSelected)
                setEtudiants({ ...etudiants, [selectedGroup]: filtredEtudiants })
            }

        }
    }

    useEffect(() => {
        setGroupes(classes)
    }, []);
    return (
        <>
            <select onChange={(e) => { setSelectedGroup(e.target.value) }}>
                <option value="">-- selecter un groupe --</option>
                {groupes.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>
                })}
            </select>
            {/* Object.values() : {key:[]} ==> [[],[]] */}
            {/* flat(): [[],[]...]==>[] -it spread all arrays on the parent list-*/}
            {etudiants && Object.values(etudiants).flat().length > 0 ? (
                selectedGroup == '' ? (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {classes.map(element => {
                            return etudiants[element].map(function (item, index) {
                                return <CardEtudiant key={index} etudiant={item} onRemplir={onRemplir} group={element} onDeleteEtudiant={deleteEtudiant} />
                            })
                        })
                        }
                    </div>
                ) : (
                    (etudiants[selectedGroup] && etudiants[selectedGroup].length > 0) ? (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {etudiants[selectedGroup].map(function (item, index) {
                                return <CardEtudiant key={index} etudiant={item} onRemplir={onRemplir} onDeleteEtudiant={deleteEtudiant} />
                            })
                            }
                        </div>
                    ) : (
                        <div className="mt-10 text-center p-8 bg-gray-50 rounded-lg rounded-br-4xl border-2 border-cyan-900">
                            <p className="text-gray-500 text-lg font-medium">Aucun étudiant n'est inscrit dans le groupe "{selectedGroup}"</p>
                        </div>
                    )
                )
            ) : (
                <div className="mt-10 text-center p-8 bg-gray-50 rounded-lg rounded-br-4xl border-2 border-cyan-900">
                    <p className="text-gray-500 text-lg font-medium">Aucun étudiant trouvé dans le système.</p>
                </div>
            )}

        </>
    )
}
export default Select