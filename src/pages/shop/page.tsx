import { useState, useEffect } from "react";
import Link from "../../components/link";
import ShopItem from "./components/shop-item";
import { Item } from "../../types/marketplace";

export default function Page() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        async function getItems() {
            const userId = "2";
            const marketplaceApi = import.meta.env.VITE_MARKETPLACE_API;
            const res = await fetch(
                `${marketplaceApi}/marketplace/items?user_id=${userId}`
            );
            if (!res.ok) throw new Error(await res.json());

            const items = await res.json();

            // @ts-expect-error We don't have a DTO type for what comes back from DB yet
            const mappedItems = items.data.map((item) => ({
                ...item,
                transferable: item.transferable === 1,
            }));
            setItems(mappedItems);
        }
        getItems();
    }, []);

    return (
        <div className="min-h-screen flex justify-center">
            <div className="mt-8 flex items-center flex-col gap-6">
                <div>
                    <Link to={`/`}>Back to home</Link>
                </div>
                <div className="flex flex-col items-center gap-6">
                    <h3 className="text-lg font-semibold">
                        Welcome to the Cosmetics Shop!
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {items.map((item) => (
                            <ShopItem item={item} key={item.id} />
                        ))}
                    </div>
                </div>
                {/* <GameScreen /> */}
            </div>
        </div>
    );
}
