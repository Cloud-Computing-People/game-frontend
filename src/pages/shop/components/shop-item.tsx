import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Item } from "../../../types/marketplace";
import { buyItem } from "../../../api";

export default function ShopItem({ item }: { item: Item }) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: buyItem,
        onSuccess: () => {
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ["items"] }),
                queryClient.invalidateQueries({ queryKey: ["shop"] }),
                queryClient.invalidateQueries({ queryKey: ["bank"] }),
            ]);
        },
        onError: (error) => {
            console.error(error);
        },
        retry: false,
    });

    return (
        <div className="bg-slate-100 py-6 px-12 flex flex-col items-center gap-6">
            <div className="flex-1 flex items-center flex-col gap-3">
                <h5 className="text-lg font-semibold underline">{item.name}</h5>
                <p className="text-lg ">${item.price}</p>
                {item.transferable && (
                    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                        transferable
                    </span>
                )}
            </div>

            <button
                onClick={() => mutation.mutate(item.id)}
                className="border-2 bg-green-500 px-2 py-1 text-white"
            >
                Buy
            </button>
        </div>
    );
}
