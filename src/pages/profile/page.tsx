import { useEffect, useState } from "react";
import Link from "../../components/link";
import { User } from "../../types/user";

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [userItems, setUserItems] = useState<any[]>([]);
    useEffect(() => {
        const user_id = "2";

        async function getUser() {
            const userApi = import.meta.env.VITE_USER_API;
            const res = await fetch(`${userApi}/users/${user_id}`);
            if (!res.ok) throw new Error(JSON.stringify(res));

            const user = await res.json();
            setUser(user.data);
        }

        async function getUserItems() {
            const marketplaceApi = import.meta.env.VITE_MARKETPLACE_API;
            const res = await fetch(
                `${marketplaceApi}/marketplace/${user_id}/items`
            );
            if (!res.ok) throw new Error(await res.json());

            const items = await res.json();

            // @ts-expect-error We don't have a DTO type for what comes back from DB yet
            const mappedItems = items.data.data.map((item) => ({
                ...item,
                transferable: item.transferable === 1,
            }));
            setUserItems(mappedItems);
        }

        getUserItems();
        getUser();
    }, []);

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
                            <h5 className="font-bold">{user?.username}</h5>
                        </div>
                        <div className="text-center">
                            <p className="text-muted-foreground">Email</p>
                            <h5 className="font-bold">{user?.email}</h5>
                        </div>
                        <div className="text-center">
                            <p className="text-muted-foreground">Your Items</p>
                            {userItems &&
                                userItems.map((item) => {
                                    return <p>{item.name}</p>;
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
