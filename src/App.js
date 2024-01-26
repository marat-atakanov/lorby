import Layout from "./pages/Layout/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./components/Register/Registration";
import Login from "./components/Login/Login";
import Verification from "./components/Verification/Verification";
import MainPage from "./pages/MainPage/MainPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Login/>} />
                    <Route path="/register" element={<Registration/>} />
                    <Route path="/verification" element={<Verification/>}/>
                </Route>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
