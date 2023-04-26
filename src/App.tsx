import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from "./pages/Game";
import { Index } from "./pages/Index";

const router = createBrowserRouter([
    { path: "/", element: <Index /> },
    { path: "/game", element: <Game /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
