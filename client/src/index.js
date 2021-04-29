import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './components/chessComponents/serviceWorker';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './index.css';
ReactDOM.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <App />
        </DndProvider>
    </React.StrictMode>,
document.getElementById('root'));

serviceWorker.unregister();
