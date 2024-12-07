// We can implement a super basic game with DOM
// But ideally replace this with a canvas element

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCountdown } from "../../../hooks";
import { useNavigate } from "react-router";
import { saveGame } from "../../../api";

export default function GameScreen() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: saveGame,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bank"],
            });
        },
        onError: (error) => {
            console.error(error);
        },
        retry: false,
    });
    const navigate = useNavigate();
    const { countdown, endCountdown } = useCountdown(5, {
        onFinish: () => {
            mutation.mutate({
                score: 100,
                acquiredCurrency: 5.0,
                timeStamp: new Date().toISOString().split(".")[0],
            });
        },
    });

    if (mutation.isError) {
        return (
            <div className="flex flex-col item-center gap-6">
                <p>Something went wrong!</p>
                <button
                    onClick={() => navigate(0)}
                    className="border-2 bg-green-500 px-2 py-1 text-white"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (mutation.isPending) {
        return "LOADING";
    }

    return (
        <>
            {mutation.isSuccess ? (
                <div className="flex p-8 flex-col items-center gap-6">
                    <h3 className="text-lg font-semibold">
                        Thank you for playing!
                    </h3>
                    <p>Your score was: 100</p>
                    <p>You earned: $5</p>
                    <button
                        onClick={() => navigate(0)}
                        className="border-2 bg-green-500 px-2 py-1 text-white"
                    >
                        Play Again
                    </button>
                </div>
            ) : (
                <div className="flex p-8 flex-col items-center gap-6">
                    <h3 className="text-lg font-semibold">
                        Welcome to the Game
                    </h3>
                    <p>Your game will end in {countdown} seconds</p>
                    <button
                        onClick={endCountdown}
                        className="border-2 bg-red-500 px-2 py-1 text-white"
                    >
                        End Game
                    </button>
                </div>
            )}
        </>
    );
}
