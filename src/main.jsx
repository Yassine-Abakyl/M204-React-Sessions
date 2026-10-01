import {createRoot} from 'react-dom/client';
import App from './App.jsx'; 
import './style.css';
createRoot(document.getElementById("root")).render(
    <App/>
)

// we dont use {} when we import an defaulted export function