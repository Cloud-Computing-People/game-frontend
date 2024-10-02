import { Link as RouterLink } from "react-router-dom";

export default function Link({
    children,
    to,
}: {
    children: React.ReactNode;
    to: string;
}) {
    return (
        <RouterLink className="hover:underline hover:text-red-600" to={to}>
            {children}
        </RouterLink>
    );
}
