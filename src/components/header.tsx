import { useNavigate } from "react-router-dom";
import { getUserFromSession } from "../util/get-user";
import { googleLogout } from "@react-oauth/google";

export default function Header() {
    const user = getUserFromSession();
    const navigate = useNavigate();

    if (!user) {
        return;
    }

    return (
        <div className="h-16 fixed flex items-center bottom-0 w-full justify-between px-8 bg-indigo-200/70 backdrop-blur-md">
            <p>
                Signed in as <span className="font-bold">{user.name}</span>
            </p>
            <button
                className="border-2 px-2 py-1 bg-white text-black"
                onClick={() => {
                    googleLogout();
                    localStorage.removeItem("session");
                    navigate("/login");
                }}
            >
                Log out
            </button>
        </div>
    );
}
