import { useNavigate } from "react-router-dom";
import { getUserFromSession } from "../util/get-user";
import { googleLogout } from "@react-oauth/google";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUserBalance } from "../api";

export default function Header() {
    const navigate = useNavigate();

    const user = getUserFromSession();

    if (!user) {
        return;
    }

    return (
        <div className="h-16 fixed flex items-center bottom-0 w-full justify-between px-8 bg-indigo-200/70 backdrop-blur-md">
            <p>
                Signed in as <span className="font-bold">{user.name}</span>{" "}
                <UserBalance />
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

function UserBalance() {
    const balanceRes = useQuery({
        queryKey: ["bank"],
        queryFn: getUserBalance,
        retry: false,
    });

    if (balanceRes.isPending) {
        return "LOADING";
    }

    if (balanceRes.isError) {
        return null;
    }
    const balance = balanceRes.data.data.totalCurrency;

    if (!balance) {
        return null;
    }

    return (
        <span className="text-sm ml-3 font-bold text-indigo-900">
            Balance: ${balance}
        </span>
    );
}
