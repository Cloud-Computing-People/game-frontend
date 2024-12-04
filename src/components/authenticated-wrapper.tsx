import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
import { useEffect } from "react";

export default function AuthenticatedWrapper() {
    const navigate = useNavigate();

    useEffect(() => {
        const session = localStorage.getItem("session");

        if (!session) {
            navigate("/login");
        }
    }, [navigate]);
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1">
                <Outlet />
            </div>
            <Header />
        </div>
    );
}
