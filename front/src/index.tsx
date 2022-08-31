import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WithUserContext as Context } from "./components/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Context children = {<App />}/>
  // </React.StrictMode>
);
