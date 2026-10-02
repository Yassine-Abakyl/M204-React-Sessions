import Header from './Header.jsx'
import Aside from './Aside.jsx'
import Content from './Content1.jsx' 

function App(){
    return(
        <div className="min-h-screen bg-slate-100">

            <Header />
            

            <div className="flex">

                <Aside />

                <Content />

            </div>

        </div>
    );
    
}
export default App

