function Aside(){
    return( <aside className="min-h-screen w-64 bg-cyan-900 p-5 text-white">

            <h2 className="mb-5 text-xl font-bold">
                Menu
            </h2>

            <ul className="space-y-3">

                <li>
                    <a
                        href="#"
                        className="block rounded-lg p-3 hover:bg-slate-700"
                    >
                        Accueil
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        className="block rounded-lg p-3 hover:bg-slate-700"
                    >
                        Étudiants
                    </a>
                </li>

                <li>
                    <a
                        href="#"
                        className="block rounded-lg p-3 hover:bg-slate-700"
                    >
                        Notes
                    </a>
                </li>

            </ul>

        </aside>)
}

export default Aside





