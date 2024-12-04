import { jwtDecode } from "jwt-decode";

export function getUserFromSession() {
    const session = localStorage.getItem("session");
    if (!session) {
        return null;
    }
    const decoded = jwtDecode(session);
    return decoded;
}
