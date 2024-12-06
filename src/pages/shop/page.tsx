import Link from "../../components/link";
import ShopItem from "./components/shop-item";
import { getShopItems } from "../../api";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
    const shopItemsRes = useQuery({
        queryKey: ["shop"],
        queryFn: getShopItems,
    });

    if (shopItemsRes.isPending) {
        return "LOADING";
    }

    if (shopItemsRes.isError) {
        return JSON.stringify(shopItemsRes.error, null, 2);
    }

    return (
        <div className="min-h-screen flex justify-center">
            <div className="mt-8 mb-8 flex items-center flex-col gap-6">
                <div>
                    <Link to={`/`}>Back to home</Link>
                </div>
                <div className="flex flex-col items-center gap-6">
                    <h3 className="text-lg font-semibold">
                        Welcome to the Cosmetics Shop!
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {shopItemsRes.data.map((item) => (
                            <ShopItem item={item} key={item.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
