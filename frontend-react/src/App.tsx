import './App.less'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/Home.tsx";


function App() {

    return(
        <BrowserRouter>
        <Routes>
            <Route index element={<Navigate to='/home' />} />
            <Route path={"home"} element={<Home />} />
        </Routes>
    </BrowserRouter>)
}

export default App;
