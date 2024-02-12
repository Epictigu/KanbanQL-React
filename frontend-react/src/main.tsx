import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'

import {Provider} from "react-redux";

import {store} from "./state/store.ts";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faX,faHome, faSignInAlt, faSignOutAlt, faUser, faUserPlus,} from "@fortawesome/free-solid-svg-icons";



library.add(faX,faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);



ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
           <App/>
        </Provider>

    </React.StrictMode>,
)
