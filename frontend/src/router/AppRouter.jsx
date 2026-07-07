import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "../components/navigation/Navbar";

import Home from "../pages/Home";
import Chat from "../pages/Chat";
import Services from "../pages/Services";
import Portfolio from "../pages/Portfolio";
import AISolutions from "../pages/AISolutions";
import HealthSupportAI from "../pages/HealthSupportAI";
import EquineHealthAI from "../pages/EquineHealthAI";
import UnderwaterInspectionAI from "../pages/UnderwaterInspectionAI";

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

                    <Route
                        path="/services/portfolio"
                        element={<Portfolio />}
                    />

                    <Route
                        path="/solutions"
                        element={<AISolutions />}
                    />

                    <Route
                        path="/solutions/health-support-ai"
                        element={<HealthSupportAI />}
                    />

                    <Route
                        path="/solutions/animal-health"
                        element={<EquineHealthAI />}
                    />

                    <Route
                        path="/solutions/underwater-ai"
                        element={<UnderwaterInspectionAI />}
                    />

                </Routes>

            </div>

        </BrowserRouter>
    );
}

export default AppRouter;
