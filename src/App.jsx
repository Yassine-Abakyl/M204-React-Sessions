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
//className it replace the attribute 'class' because it already defind in javascript
// we appel an exported component like that : <CmpName />
// every component return just a one global element ; so if we had alot of elements we set it inside <>...</>
