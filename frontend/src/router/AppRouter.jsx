import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import { useEffect } from "react";

import Navbar from "../components/navigation/Navbar";

import Home from "../pages/Home";
import Chat from "../pages/Chat";
import Services from "../pages/Services";
import Portfolio from "../pages/Portfolio";
import AISolutions from "../pages/AISolutions";
import HealthSupportAI from "../pages/HealthSupportAI";
import EquineHealthAI from "../pages/EquineHealthAI";
import UnderwaterInspectionAI from "../pages/UnderwaterInspectionAI";
import QuantumTradingAI from "../pages/QuantumTradingAI";
import LuxuryConciergeAI from "../pages/LuxuryConciergeAI";
import News from "../pages/News";

import { getSeoData } from "../config/seoConfig";

function PageMetadata() {

    const { pathname } = useLocation();

    useEffect(() => {

        const metadata = getSeoData(pathname);

        document.title = metadata.title;

        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", metadata.description);

        document
            .querySelector('link[rel="canonical"]')
            ?.setAttribute("href", metadata.canonical);

        document
            .querySelector('meta[property="og:url"]')
            ?.setAttribute("content", metadata.canonical);

    }, [pathname]);

    return null;
}

function AppRouter() {

    return (

        <BrowserRouter>

            <PageMetadata />

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

                    <Route
                        path="/solutions/quantum-trading-ai"
                        element={<QuantumTradingAI />}
                    />

                    <Route
                        path="/solutions/luxury-concierge-ai"
                        element={<LuxuryConciergeAI />}
                    />

                    <Route
                        path="/news"
                        element={<News />}
                    />

                </Routes>

            </div>

        </BrowserRouter>
    );
}

export default AppRouter;
