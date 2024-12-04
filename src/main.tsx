import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/page";
import ShopPage from "./pages/shop/page";
import ProfilePage from "./pages/profile/page";
import GamePage from "./pages/game/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./pages/login/page";
import AuthenticatedWrapper from "./components/authenticated-wrapper";

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        element: <AuthenticatedWrapper />,
        children: [
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
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={googleClientId}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </GoogleOAuthProvider>
    </StrictMode>
);
