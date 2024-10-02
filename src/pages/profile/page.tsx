import Link from "../../components/link";
import { User } from "../../types/user";

const user: User = {
    id: 1,
    username: "darenhua",
    email: "dh3243@columbia.edu",
    isAdmin: false,
};
export default function Page() {
    return (
        <div className="min-h-screen flex justify-center">
            <div className="mt-8 flex items-center flex-col gap-6">
                <div>
                    <Link to={`/`}>Back to home</Link>
                </div>
                <div className="flex flex-col items-center gap-12">
                    <h3 className="text-lg font-semibold">Your Profile</h3>
                    <div className="space-y-6">
                        <div className="text-center">
                            <p className="text-muted-foreground">Username</p>
                            <h5 className="font-bold">{user.username}</h5>
                        </div>
                        <div className="text-center">
                            <p className="text-muted-foreground">Email</p>
                            <h5 className="font-bold">{user.email}</h5>
                        </div>
                        <div className="text-center">
                            <p className="text-muted-foreground">Your Items</p>
                            <h5 className="font-bold">Sword</h5>
                            <h5 className="font-bold">Light Saber</h5>
                            <h5 className="font-bold">Tomato</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
