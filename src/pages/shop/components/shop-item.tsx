import { Item } from "../../../types/marketplace";

export default function ShopItem({ item }: { item: Item }) {
    return (
        <div className="bg-slate-100 py-6 px-12 flex flex-col items-center gap-3">
            <h5 className="text-lg font-semibold underline">{item.name}</h5>
            <div className="min-w-24 min-h-24 flex items-center justify-center text-muted-foreground bg-slate-200">
                img here
            </div>
            <p className="text-lg ">${item.price}</p>
            {item.transferable && (
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                    transferable
                </span>
            )}
        </div>
    );
}
