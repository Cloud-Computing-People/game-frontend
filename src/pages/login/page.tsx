import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Welcome!
                </h2>
                <p className="text-center mb-4">Please log in to continue:</p>
                <GoogleLogin
                    onSuccess={(credentials) => {
                        if (!credentials.credential) {
                            return;
                        }

                        navigate("/");
                        localStorage.setItem("session", credentials.credential);
                    }}
                    onError={() => {
                        console.error("Something went wrong!");
                    }}
                />
            </div>
        </div>
    );
}
