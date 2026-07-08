import AppRouter from "./router/AppRouter";

import {
    TranslationProvider
} from "./services/translation";

export default function App() {

    return (
        <TranslationProvider>
            <AppRouter />
        </TranslationProvider>
    );
}
