import Link from "../../components/link";
import { useQuery } from "@tanstack/react-query";
import { getUser, getUserItems } from "../../api";

export default function Page() {
    const profileRes = useQuery({
        queryKey: ["profile"],
        queryFn: getUser,
        retry: false,
    });

    const itemsRes = useQuery({
        queryKey: ["items"],
        queryFn: getUserItems,
        retry: false,
    });

    if (profileRes.isPending || itemsRes.isPending) {
        return "LOADING";
    }

    if (profileRes.isError || itemsRes.isError) {
        return (
            <>
                <p>{JSON.stringify(profileRes.error, null, 2)}</p>
                <p>{JSON.stringify(itemsRes.error, null, 2)}</p>
            </>
        );
    }

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
                            <h5 className="font-bold">
                                {profileRes.data?.username}
                            </h5>
                        </div>
                        <div className="text-center">
                            <p className="text-muted-foreground">Email</p>
                            <h5 className="font-bold">
                                {profileRes.data?.email}
                            </h5>
                        </div>
                        <div className="text-center">
                            <p className="text-muted-foreground">Your Items</p>
                            {itemsRes.data.map((item) => {
                                return <p key={item.id}>{item.name}</p>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
