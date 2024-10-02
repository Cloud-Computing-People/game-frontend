import Link from "../../components/link";
import ShopItem from "./components/shop-item";

const items = [
    {
        id: 1,
        name: "Sword",
        price: 300,
        imgURL: "",
        availableFrom: new Date(),
        availableTo: new Date(),
        transferable: true,
    },
];

export default function Page() {
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
