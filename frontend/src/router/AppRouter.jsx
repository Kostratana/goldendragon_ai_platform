import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "../components/navigation/Navbar";

import Home from "../pages/Home";
import Chat from "../pages/Chat";
import Services from "../pages/Services";

function AppRouter() {

    return (

        <BrowserRouter>

            {/* FIXED GLOBAL NAVBAR */}

            <Navbar />

            {/* APP CONTENT */}

            <div
                style={{
                    width: "100%",

                    minHeight: "100vh",

                    overflowX: "hidden"
                }}
            >

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/chat"
                        element={<Chat />}
                    />

                    <Route
                        path="/services"
                        element={<Services />}
                    />

                </Routes>

            </div>

        </BrowserRouter>
    );
}

export default AppRouter;
