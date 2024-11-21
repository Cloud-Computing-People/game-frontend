import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/page";
import ShopPage from "./pages/shop/page";
import ProfilePage from "./pages/profile/page";
import GamePage from "./pages/game/page";
import LoginPage from "./pages/login/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/shop",
        element: <ShopPage />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
    },
    {
        path: "/game",
        element: <GamePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
);
